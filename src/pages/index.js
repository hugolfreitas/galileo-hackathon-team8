import * as React from "react"
import {
  Container,
  TextInput,
  Button,
  Box,
  Paper,
  Title,
  Group,
  Collapse,
  Divider,
  Text,
  Loader,
} from "@mantine/core"
import { IconKey } from "@tabler/icons-react"

const StorageKeys = {
  API_URL: "apiUrl",
  API_TOKEN: "apiToken",
}

const IndexPage = () => {
  const [input, setInput] = React.useState("")
  const [response, setResponse] = React.useState(
    "Ask something to check your LLM safety..."
  )
  const [collapseOpened, setCollapseOpened] = React.useState(false)
  const [apiUrl, setApiUrl] = React.useState("")
  const [apiToken, setApiToken] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [hasError, setHasError] = React.useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setIsLoading(true)
    setHasError(false)
    try {
      const response = await apiService.post({
        // url: `${apiUrl}/${input}`,
        url: apiUrl,
        token: apiToken,
        payload: { input },
      })
      await new Promise(resolve => setTimeout(resolve, 1000))
      setResponse(JSON.stringify(response))
    } catch (error) {
      console.error(error)
      setHasError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveSettings = e => {
    e.preventDefault()
    localStorage.setItem(StorageKeys.API_URL, apiUrl)
    localStorage.setItem(StorageKeys.API_TOKEN, apiToken)
    setApiUrl(apiUrl)
    setApiToken(apiToken)
    setCollapseOpened(false)
  }

  React.useEffect(() => {
    const apiUrl = localStorage.getItem(StorageKeys.API_URL)
    const apiToken = localStorage.getItem(StorageKeys.API_TOKEN)
    if (apiToken) {
      setApiToken(apiToken)
    }
    if (apiUrl) {
      setApiUrl(apiUrl)
    }
  }, [])

  return (
    <Container
      size={520}
      px="xs"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Group position="center" mb="md" w="100%" justify="center">
        <Title order={1}>SecPro</Title>
      </Group>
      <Group position="center" mb="md">
        <Title order={2}>Ask something</Title>
      </Group>
      <Paper shadow="xs" p="md" radius={4} withBorder>
        <form onSubmit={handleSubmit}>
          <Group noWrap align="flex-end">
            <TextInput
              value={input}
              onChange={e => setInput(e.currentTarget.value)}
              placeholder="Type your question..."
              radius={4}
              size="md"
              style={{ flex: 1 }}
              data-autofocus
            />
            <Button
              type="submit"
              radius={4}
              size="md"
              color="indigo"
              disabled={isLoading}
              leftSection={
                isLoading ? <Loader size={18} color="white" /> : null
              }
            >
              Send
            </Button>
          </Group>
          {!isLoading && hasError && (
            <Box mt="lg" mb="lg">
              <Text c="red">Sorry, something went wrong 😥</Text>
            </Box>
          )}
          <Box mt="lg" style={{ minHeight: 80 }}>
            <Paper
              p="md"
              radius={4}
              withBorder
              style={{ color: "#888", fontSize: 18 }}
            >
              {response}
            </Paper>
          </Box>
        </form>
      </Paper>

      <Divider my="md" />
      <Button
        variant="subtle"
        // leftIcon={<IconKey size={18} />}
        onClick={() => setCollapseOpened(o => !o)}
        mb="xs"
        leftSection={
          <IconKey size={18} color={apiToken && apiUrl ? "green" : "gray"} />
        }
      >
        API Settings
      </Button>
      <Collapse in={collapseOpened}>
        <Paper shadow="xs" p="md" radius={4} withBorder>
          <TextInput
            label="API URL"
            placeholder="https://your-api.com/endpoint"
            value={apiUrl}
            onChange={e => setApiUrl(e.currentTarget.value)}
            mb="sm"
          />
          <TextInput
            label="Access token"
            placeholder="Your token..."
            value={apiToken}
            onChange={e => setApiToken(e.currentTarget.value)}
            type="password"
          />
          <Button
            type="button"
            radius={4}
            size="md"
            color="indigo"
            mt="sm"
            onClick={handleSaveSettings}
          >
            Save
          </Button>
        </Paper>
      </Collapse>
    </Container>
  )
}

export default IndexPage

const apiService = {
  post: async ({ url, token, payload }) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })

    return response.json()
  },
  get: async ({ url, token }) => {
    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.json()
  },
}
