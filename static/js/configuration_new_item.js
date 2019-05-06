/**
 * Created by akedion on 11/27/17.
 */
$(function() {
    is_internet_explorer = review_client_browser();
    if(is_internet_explorer == true){
        $('.select-all-body ul li span').attr('style', 'margin-left: 25px !important');
        $('.select-all-header .search').attr('style', 'margin-left: 25px !important');
    }
});

function review_client_browser(){
    user_agent = window.navigator.userAgent;
    user_agent_version = user_agent.indexOf("MSIE ");
    if(user_agent_version > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)){
        return true;
    }
    return false;
}
