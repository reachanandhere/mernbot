
# MERN Stack AI Chatbot

This is an AI Chatbot application, inspired by ChatGPT, by using MERN Stack and OpenAI

It's a customized chatbot where each message of the user is stored in DB and can be retrieved and deleted.

It's a completely secure application using JWT Tokens, HTTP-Only Cookies, Signed Cookies, Password Encryption, and Middleware Chains.

# Steps to Setup Backend
- Setting up Node, Express App with Typescript
- Setting up MongoDB Connection
- Setting UP keys on OPENAI
- Securing Authentication with Tokens and HTTP-only signed cookies
- Validation added for Signup and Signin using Express Validator
- User Authentication added


# Steps to Setup Frontend
- Create react app
- Install MUI, React icons, React Hot toast, React router dom

# Models
- User 
   - name
   - email
   - password
   - chats: Chat[]
- Chat
   - id
   - role
   - content
