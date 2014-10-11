json.array!(@users) do |user|
  json.extract! user, :id, :uuid, :name, :photo_base64
  json.url user_url(user, format: :json)
end
