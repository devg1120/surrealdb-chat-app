import { Surreal, Table, RecordId } from 'surrealdb';

export interface ChatMessage {
  id?: RecordId<string> | string;
  username: string;
  message: string;
  timestamp: Date;
  [key: string]: any; // index signature to satisfy SurrealDB type constraints
}

class SurrealDBService {
  private db: Surreal;
  private connected: boolean = false;

  constructor() {
    this.db = new Surreal();
  }

  async connect() {
    const connectionConfigs = [
      { url: 'ws://localhost:8000/rpc', type: 'WebSocket' },
      { url: 'http://localhost:8000/rpc', type: 'HTTP' },
      { url: 'ws://127.0.0.1:8000/rpc', type: 'WebSocket' },
      { url: 'http://127.0.0.1:8000/rpc', type: 'HTTP' },
      // Basic WebSocket endpoints also tried
      { url: 'ws://localhost:8000', type: 'WebSocket-Basic' },
      { url: 'http://localhost:8000', type: 'HTTP-Basic' },
    ];

    const errors: string[] = [];

    for (const config of connectionConfigs) {
      try {
        console.log(`🔄 Trying ${config.type} connection to ${config.url}...`);
        
        // Create a new SurrealDB instance (to avoid influence of previous attempts)
        this.db = new Surreal();
        
        // connection attempt
        await this.db.connect(config.url);
        console.log(`✅ ${config.type} connection established to ${config.url}`);
        
        // Attempt authentication first (in some versions, this is first)
        console.log('🔐 Signing in...');
        await this.db.signin({
          username: 'root',
          password: 'root'
        });
        console.log('✅ Authentication successful');

        // Select database and namespace
        console.log('🎯 Selecting namespace and database...');
        await this.db.use({
          namespace: 'chat',
          database: 'realtime'
        });
        console.log('✅ Database selected');

        this.connected = true;
        console.log(`🎉 SurrealDB connected successfully via ${config.type} to ${config.url}`);

        // Initialize chat message table
        await this.initializeSchema();
        return; // Stop if connection is successful
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`❌ ${config.type} connection failed to ${config.url}:`, errorMessage);

        // Log detailed error information
        if (error instanceof Error) {
          console.error('Error name:', error.name);
          console.error('Error stack:', error.stack?.substring(0, 200) + '...');
        }
        
        errors.push(`${config.url} (${config.type}): ${errorMessage}`);
        
        // Close connection (for next attempt)
        try {
          await this.db.close();
        } catch (closeError) {
          // Ignore errors if connection was not established
        }
        
        continue;
      }
    }

    // All connection attempts failed
    console.error('🚨 All connection attempts failed');
    console.error('Detailed errors:', errors);
    console.error('🔍 Server is running but client connection failed. Possible causes:');
    console.error('1. SurrealDB.js version compatibility issue - try: npm install surrealdb.js@^1.0.0');
    console.error('2. Browser CORS policy blocking connection');
    console.error('3. Authentication protocol changes in newer versions');
    console.error('4. WebSocket/HTTP endpoint configuration mismatch');
    console.error('5. Try different SurrealDB.js version or connection method');
    
    const finalError = new Error(`All connection attempts failed. Server is running, but client connection failed. Check browser console for detailed errors. Last error: ${errors[errors.length - 1] || 'Unknown'}`);
    throw finalError;
  }

  private async initializeSchema() {
	  console.log("initializeSchema");
    try {
      // A simpler approach: attempt table creation and catch errors
      await this.db.query(`
        DEFINE TABLE IF NOT EXISTS messages SCHEMAFULL;
        DEFINE FIELD IF NOT EXISTS username ON messages TYPE string ASSERT $value != NONE;
        DEFINE FIELD IF NOT EXISTS message ON messages TYPE string ASSERT $value != NONE;
        DEFINE FIELD IF NOT EXISTS timestamp ON messages TYPE datetime DEFAULT time::now();
        DEFINE INDEX IF NOT EXISTS messages_timestamp_idx ON messages COLUMNS timestamp;
      `);
      console.log('✅ Messages table schema initialized successfully');
    } catch (error) {
      // Ignore "already exists" errors
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (errorMessage.includes('already exists') || errorMessage.includes('Table already exists')) {
        console.log('✅ Messages table already exists, continuing...');
        return; // Ignore error and continue
      }
      
      console.warn('Schema initialization warning:', errorMessage);
      // Log other errors as warnings, but continue with connection
    }
  }

  async sendMessage(username: string, message: string): Promise<ChatMessage[]> {
    if (!this.connected) {
      throw new Error('Database not connected');
    }

    const info = await this.db.version();
    console.log("version:", info.version); // "surrealdb-3.0.1"

    try {
      console.log("sendMessage", username, message);
/*
      const result = await this.db.create('messages', {
        username,
        message,
        timestamp: new Date()
      });
*/
      const messages = new Table('messages');
      const result = await this.db.create(messages).content({
        username: username,
        message: message,
        timestamp: new Date()
      });
      console.log(result)
      return Array.isArray(result) ? result as ChatMessage[] : [result as ChatMessage];
    } catch (error) {
      console.error('Failed to send message:', error instanceof Error ? error.message : String(error));
      throw error;
    }
  }

  async getMessages(limit: number = 50): Promise<ChatMessage[]> {
    console.log("getMessages");

    if (!this.connected) {
      throw new Error('Database not connected');
    }

    try {
      //const result = await this.db.select('messages');
      const messages = new Table('messages');
      const result = await this.db.select(messages);
      
      if (result && Array.isArray(result)) {
        const messages = result as ChatMessage[];
        return messages
          .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
          .slice(-limit);
      }
      return [];
    } catch (error) {
      console.error('Failed to get messages:', error instanceof Error ? error.message : String(error));
      return [];
    }
  }

  // Real-time message monitoring
  async subscribeToMessages(callback: (message: ChatMessage) => void) {
    if (!this.connected) {
      throw new Error('Database not connected');
    }

	      console.log("subsc");
    try {
	    
      // Use SurrealDB's live query to monitor real-time updates
/*
      const queryUuid = await this.db.live('messages', (action, result) => {
	      console.log("live");
        if (action === 'CREATE' && result) {
	     console.log("CREATE");
          callback(result as ChatMessage);
        }
      });
*/
const live = await this.db.live(new Table('messages'));


//https://surrealdb.com/docs/sdk/javascript/concepts/live-queries#:~:text=JavaScript%20%7C%20SDK%20%7C%20Live%20queries
//
/*
live.subscribe((action, result, record) => {
     console.log("callback", action, result, record);
        if (action === 'CREATE' && result) {
	     console.log("CREATE");
          callback(result as ChatMessage);
        }
})
*/

live.subscribe((data) => {
     console.log("callback", data);
        if (data.action === 'CREATE' && data.value) {
	     console.log("CREATE");
          callback(data.value as ChatMessage);
        }
})
console.log(live)
/*
      const queryUuid = await this.db.live('messages');

      //await surreal.subscribeLive(queryUuid, (action, result) => {
      await this.db.subscribeLive(queryUuid, (action, result) => {
	      console.log("live");
        if (action === 'CREATE' && result) {
	     console.log("CREATE");
          callback(result as ChatMessage);
        }
      });
*/

      return live.toString();


/*
const subscription = await this.db.live(new Table('messages'));

for  await (const update of subscription) {
    console.log('Update:', update.action, update.result);
}

     console.log("-------------");  
    //return subscription.toString();
    return subscription;
*/
    } catch (error) {
      console.error('Failed to subscribe to messages:', error instanceof Error ? error.message : String(error));
      throw error;
    }
  }

  async unsubscribe(queryUuid: string) {
    try {
      // Pass as UUID type
      await this.db.kill(queryUuid as any);
    } catch (error) {
      console.error('Failed to unsubscribe:', error instanceof Error ? error.message : String(error));
    }
  }

  async disconnect() {
    if (this.connected) {
      await this.db.close();
      this.connected = false;
      console.log('SurrealDB disconnected');
    }
  }

  isConnected(): boolean {
    return this.connected;
  }
}

// singleton instance
export const surrealDB = new SurrealDBService();
