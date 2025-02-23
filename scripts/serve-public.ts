import "dotenv/config";
import ngrok from "@ngrok/ngrok";

const listener = await ngrok.forward({
  addr: 3000,
  authtoken_from_env: true,
});

console.log(`Ingress established at: ${listener.url()}`);
