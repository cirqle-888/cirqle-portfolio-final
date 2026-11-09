const fs = require('fs');
const lines = fs.readFileSync('/Users/farooq/.gemini/antigravity/brain/1ff8bc2a-1f42-4fea-9613-b7cea7fbb04c/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');
for (const line of lines) {
  if (!line) continue;
  const obj = JSON.parse(line);
  if (obj.content && obj.content.includes('function PaperLeaf({')) {
     console.log(obj.content);
     break;
  }
}
