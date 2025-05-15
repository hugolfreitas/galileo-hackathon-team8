# SecPro

A simple Gatsby + Mantine project for interacting with an API and managing external IDs.

## Getting Started

### 1. Install dependencies

```
npm install
```

### 2. Start the development server

```
npm start
```

The app will be available at [http://localhost:3333](http://localhost:3333)

---

## API Settings

To connect to your backend API:

1. Click on **API Settings** (below the main form).
2. Enter your **API URL** (e.g., `http://127.0.0.1:8000/run`).
3. (Optional) Enter your **Access token** if your API requires authentication.
4. Click **Save** to store your settings (they are saved in your browser's local storage).

---

## Using the Form

- **Level of importance**: Select a value from 0 to 10.
- **External ID**: Choose an existing external ID or add a new one in the API Settings section under "Manage External IDs".
- Click **Send** to submit the form. The result will be displayed below.

---

## Adding New External IDs

1. Go to **API Settings** > **Manage External IDs**.
2. Type a new external ID in the input field.
3. Click **Add**. The new ID will appear in the dropdown in the main form.

---

## Notes
- The Access token is optional and only needed if your API requires it.
- All settings are stored locally in your browser and will persist between sessions.

---

## License

MIT
