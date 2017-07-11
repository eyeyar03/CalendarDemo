var cal; //made global for testing (switching month and year)

$(function() {
	
	var events = mockEvents(); //generate events for testing
	
	var $calendarDemoContainer = $('#generatedCalendarContainer');
	
	cal = $calendarDemoContainer.clndr({
		  render: function(data) {
			  
			  /**
			  *START - This block of code is the workaround for the issue discussed here: https://jsfiddle.net/Eyeyarowen/2p35apqq/.
			  *Basically, the solution is to slice/group the days into weeks.
			  */
			  var _days = data.days;
			  var weeks = new Array();
			  var daysLength = _days.length;
			  
			  if(daysLength) {
				  var numberOfWeeks = daysLength/7; //check number of weeks to iterate.
				  
				  var lastDayIndex = 0;	//this is used as a start of slice method.
				  for(var i = 0; i < numberOfWeeks; i++) {
					 var week = {};
					 week.days = _days.slice(lastDayIndex, lastDayIndex + 7); //This is where slicing/grouping of days into weeks happens
					 lastDayIndex += 7;
					 weeks.push(week); //add each week (that contains days) into weeks array.
				  }
			  }
			  
			  data.weeks = weeks; //add a new property (named weeks) into data object. Used this weeks property in template instead of days.
			  
			  console.log(JSON.stringify(data)); //output the json object in console for inspection.
			  
			  /**END*/

			  var calendarRactiveOptions = {
					el: '#generatedCalendarContainer',
					template: '#calendarDemoTmpl',
					data: data
				};
				
				//use Ractive inside render method. make the variable global when template manipulation is necessary.
				var calendarRactive = new Ractive(calendarRactiveOptions);
		  },
		  
		  daysOfTheWeek	: ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'],
		  
		  forceSixRows: true,
		  
		  events: events
		  
	  
	})
})

function mockEvents(){
	var events = new Array();
	var event1 = { date: '2017-07-12', title: 'Just a normal day!'};
	var event2 = { date: '2017-08-03', title: 'BIRTHDAY!'};
	var event3 = { date: '2017-06-12', title: 'Independence Day!'};
	events.push(event1);
	events.push(event2);
	events.push(event3);
	
	return events;
}