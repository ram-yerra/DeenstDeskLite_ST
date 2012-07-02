/* Description:Footer/Main View- Bottom tab bar with home, search, new etc. icons
* Created On: 
* Created By: Ram
* Last Modified By:Nikhil
* Last Modified Reason: Added Header and comments
* TODO:
*/
Ext.define('DDLApp.view.Main', {
    //create a new panel
	extend: 'Ext.tab.Panel',
	id: 'mainview',
	//xtype can be used to load view in any view, it works like id
	xtype:'maincontent',
	alias:'widget.mainview',
	id: 'idMain',
    config: {
        //position tab bar on bottom
        tabBarPosition: 'bottom',
        
        defaults: {
            layout: 'fit',
        },
        
        items: [
            {
                id: 'home',//home button
                title: 'Home',
                iconCls: 'home',
                items: [
                    {
                        xtype: 'incidentsList' //contains list of incidents
                    },
                ]
            },
            {
                id: 'new', //new button
                title: 'Ticket',
                iconCls: 'add',
                items: [
                    {
                        xtype: 'newIncident' //form to create new ticket
                    }
                ]
            },
            {
                id: 'search', //search button
                title: 'Search',
                iconCls: 'search',
                items: [
                    {
                        xtype: 'searchIncidentsList' //loads search view
                    }
                ]
            },
            {
                id: 'settings', //settings button
                title: 'Settings',
                iconCls: 'settings',
                items: [
                    {
                        xtype: 'settingview' //loads settings view
                    }
                ]
            },
            {
                id: 'more', //more button
                title: 'More',
                iconCls: 'more',
                items: [
                    {
                        xtype: 'moreList' //contains logout and about
                    }
                ]
            }
        ],
    }

});