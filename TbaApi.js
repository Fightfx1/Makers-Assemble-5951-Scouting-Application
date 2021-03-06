import axios from 'axios'


var sortByProperty = function (property) {
    return function (x, y) {
        return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
    };
};
export default class TBA
{
    constructor(ApiUrl)
    {
        this.request = axios.create({
            baseURL:ApiUrl
        })
    }

    async GetMatches(UserName)
    {
        let res = await this.request({
            method: 'get',
            url:`/GetMatchSchedule/${UserName}`,
        }).catch(() =>{
            return {"data":[]}
        })

        return res.data
    }
    async GetMatches1()
    {
        let res = await this.request({
            url:`/event/${this.EventCode}/matches`,
            method: 'get',
        })

        let fixedData;
        let RedTeams = []
        let BlueTeams = []
        let MatchNumbers = []



        let Matches = res.data
        
        Matches = Matches.sort(sortByProperty('match_number'))
        Matches = Matches.filter((a) => a.comp_level == 'qm')

        Matches.forEach(element => {
            MatchNumbers.push([element.match_number]);
            BlueTeams.push(element.alliances.blue.team_keys)
            RedTeams.push(element.alliances.red.team_keys)
        });

        fixedData = {
            tableData:MatchNumbers,
            BlueTeams,
            RedTeams
        }

        return fixedData;
        
    }
}