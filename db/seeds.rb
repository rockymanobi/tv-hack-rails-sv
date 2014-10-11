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

movie_uris =[
  "https://www.youtube.com/watch?v=Itv7I3cVcWI",
  "https://www.youtube.com/watch?v=SsmfYJEamyU",
  "https://www.youtube.com/watch?v=YxheBA8YwIo",
  "https://www.youtube.com/watch?v=Qhi3Yl1WtRg",
  "https://www.youtube.com/watch?v=CH6l2ToFTQE",
  "https://www.youtube.com/watch?v=2-oh0q4PBkk",
  "https://www.youtube.com/watch?v=T4PZ_i9z8xg",
  "https://www.youtube.com/watch?v=z58wiFbi2zs",
  "https://www.youtube.com/watch?v=j9e1rEbVXtc",
  "https://www.youtube.com/watch?v=R8QkMAc3UTI",
]

10.times { |n|
  channel = Channel.new(
    { uuid: "mov#{n}" , title: "動画タイトル_#{n}", source_uri: "#{movie_uris[n]}"});
  channel.save!
} 


3.times { |n|
  user = User.new(
    { uuid: "user#{n}", name: "ユーザー#{n}" }
  );
  user.save!
}



