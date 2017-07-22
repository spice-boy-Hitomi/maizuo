


function reducer(state,action){
    switch(action.type){
        case 'GET_SLIDER':
            return Object.assign({},state,{
                sliderArr: action.sliderArr
            })
        case 'GET_NOW':
            return Object.assign({},state,{
                nowArr: action.nowArr
            })
        case 'GET_COMING':
            return Object.assign({},state,{
                comingArr: action.comingArr
            })
        case 'GET_MOVIE_NOW':
            return Object.assign({},state,{
                movieNowArr: action.movieNowArr
            })
        case 'GET_MOVIE_COMING':
            return Object.assign({},state,{
                movieComingArr: action.movieComingArr
            })
        case 'GET_DETAIL':
            return Object.assign({},state,{
                detail: action.detail
            })
        case 'GET_CINEMA':
            return Object.assign({},state,{
                cinemaArr: action.cinemaArr
            })
        case 'SET_TITLE_CINEMA':
            return Object.assign({},state,{
                title: action.title
            })
        default:
            return state;
    }
}

export default reducer;