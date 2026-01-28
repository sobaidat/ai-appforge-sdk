# @ai-appforge/react-native

The official React Native client for AI App Forge.

## Installation

```bash
npm install @ai-appforge/react-native
```

> **Note**: This package relies on the global `fetch` API, which is available by default in React Native.

## Configuration

You can configure the client using environment variables (using a library like `react-native-dotenv`) or by passing options to the constructor.

## Usage

```typescript
import { AiAppForgeClient } from '@ai-appforge/react-native';

const client = new AiAppForgeClient({
  apiKey: 'your-api-key'
});

// Example: Triggering a workflow from a button press
const handlePress = async () => {
  try {
    const result = await client.workflows.execute('workflow-id', {
      userInput: 'Hello AI'
    });
    console.log('Result:', result);
  } catch (error) {
    console.error(error);
  }
};
```
