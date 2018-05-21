var path = require("path");
module.exports = function(mongoose)
{
    const Pet = require("../models/pet.js")(mongoose);
    return {
        index: async function(request, response)
        {
            response.sendFile(path.resolve("./MEANBeltExam/dist/MEANBeltExam/index.html"));
        },
        showPets: async function(request, response)
        {
            Pet.find({}, function(err, people)
            {
                var sortedTypes = {};
                var result = [];
                for(let iii = 0; iii < people.length; iii++)
                {
                    if(sortedTypes[people[iii].type] == undefined)
                    {
                        sortedTypes[people[iii].type] = [];
                    }
                    sortedTypes[people[iii].type].push(people[iii]);
                }
                for(let iii in sortedTypes)
                {
                    result = result.concat(sortedTypes[iii]);
                }
                response.json(result);
            });
        },
        newPet: async function(request, response)
        {
            var newPerson = new Pet({
                name:request.body.name,
                type:request.body.type,
                description:request.body.description,
                skills:[],
                likes:0,
                dateCreated:Date.now(), dateUpdated: Date.now()});
            for(let iii = 0; iii < 3; iii++)
            {
                if(request.body.skills[iii] != "")
                {
                    newPerson.skills.push(request.body.skills[iii]);
                }
            }
            var testPet = await Pet.find({name:newPerson.name});
            if(testPet.length != 0)
            {
                response.json({errors:{name:{message:"Pet's name must be unique"}}})
            }
            else
            {
                await newPerson.save(function(err)
                {
                    response.json(err);
                });
            }
        },
        updatePet: async function(request, response)
        {
            var target = await Pet.findOne({_id: request.params.id});
            var bool = target.name==request.body.name?true:false;
            target.skills = [];
            target.name = request.body.name;
            target.type = request.body.type;
            target.description = request.body.description;
            target.likes = request.body.likes;
            for(let iii = 0; iii < 3; iii++)
            {
                if(request.body.skills[iii] != "")
                {
                    target.skills.push(request.body.skills[iii])
                }
            }
            target.dateUpdated = Date.now();
            var testPet = await Pet.find({name:target.name});
            if(testPet.length != 0 && !bool)
            {
                response.json({errors:{name:{message:"Pet's name must be unique"}}})
            }
            else
            {
                await target.save(function(err)
                {
                    response.json(err);
                });
            }
        },
        removePet: async function(request, response)
        {
            await Pet.remove({_id:request.params.id});
        },
        showPet: async function(request, response)
        {
            response.json(await Pet.findOne({_id:request.params.id}));
        }
    }
}
