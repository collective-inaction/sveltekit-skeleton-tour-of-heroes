import { writable } from "svelte/store";

type Message = string;

const messages = writable<Message[]>([]);

function appendMessage(message: Message) {
  messages.update((messages) => [...messages, message]);
}

export { messages, appendMessage };
