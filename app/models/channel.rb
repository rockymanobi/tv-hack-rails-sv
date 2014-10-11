class Channel < ActiveRecord::Base
  scope :uuid_is, ->(channel_uuid){ where( uuid: channel_uuid ) }
  STATUS_AVAILABLE = 0 
end
