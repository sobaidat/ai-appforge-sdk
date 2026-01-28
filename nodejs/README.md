# @ai-appforge/nodejs

The official Node.js client for AI App Forge.

## Installation

```bash
npm install @ai-appforge/nodejs
```

## Configuration

You can configure the client using environment variables or by passing options to the constructor.

**Environment Variables:**
- `AI_APP_FORGE_BASE_URL`: The URL of your AI App Forge instance (default: `http://localhost:3001`).
- `AI_APP_FORGE_API_KEY`: Your API key.

## Usage

```typescript
import { AiAppForgeClient } from '@ai-appforge/nodejs';

// Initialize the client
// API key can be passed here or set via AI_APP_FORGE_API_KEY env var
const client = new AiAppForgeClient({
  apiKey: 'your-api-key'
});

async function runWorkflow() {
  try {
    const result = await client.workflows.execute('workflow-id', {
      input_param: 'value'
    });
    console.log('Workflow Result:', result);
  } catch (error) {
    console.error('Error executing workflow:', error);
  }
}

runWorkflow();
```
