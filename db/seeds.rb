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

def buildFurefure( segment, vote )
  vote.times do ||
    f = Furefure.new({ channel_id: 1, user_id: 1 });
    f.at_time_sec = 5 * segment
    f.save!
  end
end



buildFurefure(1, 10)
buildFurefure(2, 28)
buildFurefure(3, 49)
buildFurefure(4, 33)
buildFurefure(5, 10)
buildFurefure(6, 5)
buildFurefure(7, 80)
buildFurefure(8, 130)
buildFurefure(9, 60)
buildFurefure(10, 100)
buildFurefure(17, 140)
buildFurefure(28, 40)
buildFurefure(29, 20)
buildFurefure(30, 130)
buildFurefure(51, 100)
