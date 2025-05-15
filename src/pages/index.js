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
  Select,
} from "@mantine/core"
import { IconKey } from "@tabler/icons-react"

const StorageKeys = {
  API_URL: "apiUrl",
  API_TOKEN: "apiToken",
}

const IndexPage = () => {
  const [response, setResponse] = React.useState({
    summary: "",
    article_count: 0,
    input_tokens: 0,
  })
  const [collapseOpened, setCollapseOpened] = React.useState(false)
  const [apiUrl, setApiUrl] = React.useState("")
  const [apiToken, setApiToken] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [hasError, setHasError] = React.useState(false)
  const [input, setInput] = React.useState("0")
  const [externalId, setExternalId] = React.useState("Galileo Galilei")
  const [externalIdOptions, setExternalIdOptions] = React.useState([
    { value: "Galileo Galilei", label: "Galileo Galilei" },
    { value: "Pope Urban VIII", label: "Pope Urban VIII" },
  ])
  const [newExternalId, setNewExternalId] = React.useState("")

  const handleSubmit = async e => {
    e.preventDefault()
    setIsLoading(true)
    setHasError(false)
    try {
      // if (1 === 1) {
      //   setResponse(mockResponse)
      //   return
      // }
      const response = await apiService.post({
        // url: `${apiUrl}/${input}`,
        url: apiUrl,
        token: apiToken,
        payload: { importance: Number(input), external_id: externalId },
      })
      await new Promise(resolve => setTimeout(resolve, 500))

      if (response.summary) {
        setResponse(response)
      } else {
        setResponse({ summary: "No summary found in the response" })
      }
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
      {/* <Group position="center" mb="md">
        <Title order={2}>Ask something</Title>
      </Group> */}
      <Paper shadow="xs" p="md" radius={4} withBorder>
        <form onSubmit={handleSubmit}>
          <Group noWrap align="flex-end">
            <Select
              label="Level of importance"
              value={input}
              onChange={setInput}
              placeholder="Select level"
              radius={4}
              size="md"
              style={{ flex: 1 }}
              data={Array.from({ length: 11 }, (_, i) => ({
                value: i.toString(),
                label: i.toString(),
              }))}
              // data-autofocus
            />
            <Select
              label="External ID"
              value={externalId}
              onChange={setExternalId}
              placeholder="Select external ID"
              radius={4}
              size="md"
              style={{ flex: 1 }}
              data={externalIdOptions}
            />
            <Button
              type="submit"
              radius={4}
              size="md"
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
            <Paper p="md" radius={4} withBorder style={{ fontSize: 18 }}>
              {formatSummaryText(response.summary)}
            </Paper>
            {response.input_tokens ? (
              <Text size="sm" style={{ color: "#888" }} align="right">
                {response.input_tokens} tokens
              </Text>
            ) : null}
          </Box>
        </form>
      </Paper>

      <Divider my="md" />
      <Button
        variant="subtle"
        onClick={() => setCollapseOpened(o => !o)}
        mb="xs"
        leftSection={<IconKey size={18} color={apiUrl ? "green" : "gray"} />}
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
          <Divider my="sm" />
          <Title order={5} mb="xs">
            Manage External IDs
          </Title>
          <Group align="flex-end" mb="sm">
            <TextInput
              label="Add new External ID"
              placeholder="Type a new external ID"
              value={newExternalId}
              onChange={e => setNewExternalId(e.currentTarget.value)}
            />
            <Button
              onClick={() => {
                if (
                  newExternalId.trim() &&
                  !externalIdOptions.some(
                    opt => opt.value === newExternalId.trim()
                  )
                ) {
                  setExternalIdOptions(current => [
                    ...current,
                    {
                      value: newExternalId.trim(),
                      label: newExternalId.trim(),
                    },
                  ])
                  setNewExternalId("")
                }
              }}
              disabled={
                !newExternalId.trim() ||
                externalIdOptions.some(
                  opt => opt.value === newExternalId.trim()
                )
              }
            >
              Add
            </Button>
          </Group>
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

const formatSummaryText = text => {
  const parts = text.split("This week in AI")
  return (
    <>
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          {part}
          {index < parts.length - 1 && <b>This week in AI</b>}
        </React.Fragment>
      ))}
    </>
  )
}

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

const mockResponse = {
  summary:
    "This week in AI: The potential of artificial intelligence (AI) to revolutionize medicine and healthcare is being widely discussed, with the biggest impact expected to be reducing doctors' paperwork. In other news, OpenAI CEO Sam Altman, along with executives from Microsoft and Advanced Micro Devices, testified before Congress about the opportunities, risks, and needs of the AI industry. They emphasized the importance of investment in infrastructure and the need for streamlined policy for AI-related projects.",
  article_count: 2,
  input_tokens: 3012,
}
