# coding: utf-8
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
#
#


10.times { |n|
  channel = Channel.new(
    { uuid: "mov#{n}" , title: "動画タイトル_#{n}", source_uri: "http://google.com/sample#{n}"});
  channel.save!
} 


3.times { |n|
  user = User.new(
    { uuid: "user#{n}", name: "ユーザー#{n}" }
  );
  user.save!
}



