json.array!(@furefures) do |furefure|
  json.extract! furefure, :id, :channel_id, :user_id, :at_time_sec
  json.url furefure_url(furefure, format: :json)
end
