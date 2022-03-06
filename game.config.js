let enemyLevel = {
    'RED' : {
        'speed':[1,2,3],
        'health':1,
        'color' : 'GREEN',
        'size' : 20
    },

    'YELLOW' : {
        'speed':[1,2],
        'health':2,
        'color' : 'YELLOW',
        'size' : 25

    },

    'VIOLET' : {
        'speed':[1],
        'health':3,
        'color' : 'VIOLET',
        'size' : 20
    },
    'WHITE' : {
        'speed':[1],
        'health':20,
        'color' : 'WHITE',
        'size' : 50
    },
    'ORANGE' : {
        'speed':[3,6],
        'health':1,
        'color' : 'ORANGE',
        'size' : 10
    }


}

let levels = [
    {   //Level 1
        'enemy' : [
            {'count':5,'type':enemyLevel.RED},
            {'count':5,'type':enemyLevel.YELLOW}
        ],
        'player' : {
            'bullet':10
        }
    },
    {
        //Level 2
        'enemy' : [
            {'count':20,'type':enemyLevel.RED}
        ],
        'player' : {
            'bullet':10
        }
    },
    {
        //Level 3
        'enemy' : [
            {'count':5,'type':enemyLevel.RED},
            {'count':5,'type':enemyLevel.YELLOW}
        ],
        'player' : {
            'bullet':5
        }
    },
    {
        //Level 4
        'enemy' : [
            {'count':10,'type':enemyLevel.RED},
            {'count':5,'type':enemyLevel.YELLOW},
            {'count':3,'type':enemyLevel.VIOLET}
        ],
        'player' : {
            'bullet':10
        }
    },
    {
        //Level 5
        'enemy' : [
            {'count':15,'type':enemyLevel.RED},
            {'count':10,'type':enemyLevel.YELLOW},
            {'count':5,'type':enemyLevel.VIOLET},
            {'count':1,'type':enemyLevel.WHITE}
        ],
        'player' : {
            'bullet':15
        }
    },
    {
        //Level 6
        'enemy' : [
            {'count':5,'type':enemyLevel.RED},
            {'count':5,'type':enemyLevel.YELLOW},
            {'count':5,'type':enemyLevel.VIOLET},
            {'count':10,'type':enemyLevel.ORANGE}
        ],
        'player' : {
            'bullet':10
        }
    },
]