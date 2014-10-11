json.array!(@channels) do |channel|
  json.extract! channel, :id, :uuid, :title, :status, :source_uri
  json.url channel_url(channel, format: :json)
end
