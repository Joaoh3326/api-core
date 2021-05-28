echo '\n\n wrong route'
curl localhost:3000/heroes/teste

echo '\n\n requesting all heroes'
curl localhost:3000/heroes

echo '\n\n requesting flash'
curl localhost:3000/heroes/1

echo '\n\n requesting with wrong body'
curl --silent -X POST \
    --data-binary '{"invalid": "data"}' \
    localhost:3000/heroes

echo '\n\n delete Flash'
curl --silent -X DELETE \
    localhost:3000/heroes/1

echo '\n\n creating Chapolin'
CREATE=$(curl --silent -X POST \
    --data-binary '{"name": "Chapolin", "age": "100", "power": "Strength"}' \
    localhost:3000/heroes)

echo $CREATE

ID=$(echo $CREATE | jq .data.id)

echo $ID

echo '\n\n update Chapolin'
curl --silent -X PUT \
    --data-binary '{"age": "150"}' \
    localhost:3000/heroes/$ID

echo '\n\n clear teste'
echo '[{"id":1,"name":"flash","age":"100","power":"speed"}]' > database/data.json
