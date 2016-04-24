/**
 * Created by dif on 2016/4/16.
 */
var BookListApp = angular.module('BookListApp', ['StarBar']);
//Main Page Controller
BookListApp.controller('MainPageController', function ($scope) {
    var MainPageScope = $scope;

    //Search Key
    MainPageScope.searchKey = '';
    //Rank Items
    MainPageScope.RankItems = [
        {'rank': 0, 'rankTextShown': 'All'},
        {'rank': 1, 'rankTextShown': '1-Star'},
        {'rank': 2, 'rankTextShown': '2-Stars'},
        {'rank': 3, 'rankTextShown': '3-Stars'},
        {'rank': 4, 'rankTextShown': '4-Stars'},
        {'rank': 5, 'rankTextShown': '5-Stars'}
    ];
    //Status Items
    MainPageScope.StatusItems = [
        {'tabId': 'Tab_All', 'statusTextShown': 'All', 'status': 'All', 'actionTextShown': ''},
        {'tabId': 'Tab_Plan', 'statusTextShown': 'Planning', 'status': 'Planning', 'actionTextShown': 'To Plan'},
        {'tabId': 'Tab_Ing', 'statusTextShown': 'Reading', 'status': 'Reading', 'actionTextShown': 'To Reading'},
        {'tabId': 'Tab_Finished', 'statusTextShown': 'Completed', 'status': 'Completed', 'actionTextShown': 'Completed'}
    ];
    MainPageScope.currentRankItem = MainPageScope.RankItems[0];
    MainPageScope.currentStatusItem = MainPageScope.StatusItems[0];
    //Current Status
    //MainPageScope.currentStatus = MainPageScope.StatusItems[0].status;
    MainPageScope.ClickTabButton = function (tabBtnItem) {
        MainPageScope.currentStatusItem = tabBtnItem;
    };
    //Test Data
    MainPageScope.ListItems = [
        {
            'id': 1,
            'name': 'TestItem1',
            'rank': 1,
            'innerStatusItem':MainPageScope.StatusItems[1]
        },
        {
            'id': 2,
            'name': 'TestItem2', 'status': MainPageScope.StatusItems[1].status,
            'rank': 2,
            'innerStatusItem':MainPageScope.StatusItems[1]
        },
        {
            'id': 3,
            'name': 'TestItem3',
            'rank': 3,
            'innerStatusItem':MainPageScope.StatusItems[3]
        },
        {
            'id': 4,
            'name': 'TestItem4',
            'rank': 4,
            'innerStatusItem':MainPageScope.StatusItems[2]
        },
        {
            'id': 5,
            'name': 'TestItem5',
            'rank': 5,
            'innerStatusItem':MainPageScope.StatusItems[3]
        },
        {
            'id': 6,
            'name': 'TestItem6',
            'rank': 1,
            'innerStatusItem':MainPageScope.StatusItems[1]
        },
        {
            'id': 7,
            'name': 'TestItem7',
            'rank': 2,
            'innerStatusItem':MainPageScope.StatusItems[1]
        },
        {
            'id': 8,
            'name': 'TestItem8',
            'rank': 3,
            'innerStatusItem':MainPageScope.StatusItems[3]
        },
        {
            'id': 9,
            'name': 'TestItem9',
            'rank': 4,
            'innerStatusItem':MainPageScope.StatusItems[2]
        },
        {
            'id': 10,
            'name': 'TestItem10',
            'rank': 5,
            'innerStatusItem':MainPageScope.StatusItems[3]
        }
    ];
    MainPageScope.ListItemStatusFilter = function (listItem) {
        return (angular.equals(MainPageScope.currentStatusItem, MainPageScope.StatusItems[0]) || angular.equals(listItem.innerStatusItem, MainPageScope.currentStatusItem));
    };
    MainPageScope.ListItemRankFilter = function (listItem) {
        return (angular.equals(MainPageScope.currentRankItem, MainPageScope.RankItems[0]) || listItem.rank == MainPageScope.currentRankItem.rank);
    };
    MainPageScope.ActionBtnClick = function (actionItem, listItem) {
        listItem.innerStatusItem = actionItem;
    };
    MainPageScope.DeleteItem = function (listItem) {
        var index = MainPageScope.ListItems.indexOf(listItem);
        MainPageScope.ListItems.splice(index, 1);
    };
    MainPageScope.ShowActions = function (actionItem) {
        return (!angular.equals(MainPageScope.currentStatusItem, MainPageScope.StatusItems[0])) && (!angular.equals(actionItem, MainPageScope.currentStatusItem));
    };
    MainPageScope.emptyListItem = {
        'id': -1,
        'name': '',
        'rank': 0,
        'innerStatusItem':MainPageScope.StatusItems[0]
    };
    //MainPageScope.currentListItem = angular.copy(MainPageScope.emptyListItem);
    MainPageScope.ClearEditingItem = function(){
        MainPageScope.currentListItemIndex = -1;
        MainPageScope.editingListItem = angular.copy(MainPageScope.emptyListItem);
    };
    MainPageScope.ClearEditingItem();
    MainPageScope.EditItem = function (listItem) {
        //MainPageScope.currentListItem = listItem;
        MainPageScope.currentListItemIndex = MainPageScope.ListItems.indexOf(listItem);
        MainPageScope.editingListItem = angular.copy(listItem);
        $('#EditModal').modal();
    };
    MainPageScope.ClearSearchKey = function () {
        MainPageScope.searchKey = null;
    };
    MainPageScope.SaveItem = function () {
        //TODO: Save editingListItem, new or replace old
        if (MainPageScope.editingListItem.id==-1) {
            console.log('New Item,id: ' + MainPageScope.editingListItem.id + ", name: " + MainPageScope.editingListItem.name);
            MainPageScope.ListItems.push(MainPageScope.editingListItem);
        }
        else {
            console.log('Old Item,id: ' + MainPageScope.editingListItem.id + ", name: " + MainPageScope.editingListItem.name);
            //var index = MainPageScope.ListItems.indexOf(MainPageScope.currentListItem);
            MainPageScope.ListItems[MainPageScope.currentListItemIndex] = MainPageScope.editingListItem;
        }
        MainPageScope.ClearEditingItem();
    };
    MainPageScope.SwitchEditingItemStatus = function(statusBtnItem){
      MainPageScope.editingListItem.innerStatusItem = statusBtnItem;
    };
});