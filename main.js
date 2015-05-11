/*
**This mini backbone app utilizes backbone routers 
** to display a list of cars, boats, and planes as a SPA.
** @author benTansey
*/

/*
	Models
			*/

var Car = Backbone.Model.extend({});
var Boat = Backbone.Model.extend({});
var Plane = Backbone.Model.extend({});

/*
	Collections
				*/
var Cars = Backbone.Collection.extend({
	model: Car
});
var Boats = Backbone.Collection.extend({
	model: Boat
});
var Planes = Backbone.Collection.extend({
	model: Plane
});

var cars = new Cars([
	car1 = new Car({type: "Jeep"}),
	car2 = new Car({type: "Subaru"}),
	car3 = new Car({type: "Nissan"}),
]);


var boats = new Boats([
	boat1 = new Boat({type: "Boston Whaler"}),
	boat2 = new Boat({type: "Chris Craft"}),
	boat3 = new Boat({type: "Cigar"}),
]);

var planes = new Planes([
	plane1 = new Plane({type: "G5"}),
	plane2 = new Plane({type: "Learjet"}),
	plane3 = new Plane({type: "Cessna"}),
]);

/*
	Views
			*/
var CarView = Backbone.View.extend({
	tagName: "li",

	render: function(){
		this.$el.html(this.model.get("type"));
		return this;
	}
});			

var CarsView = Backbone.View.extend({
	tagName: "ul",
	
	render: function(){
		var that = this;
		this.model.each(function(car){
			var carView = new CarView({ model: car });
			that.$el.append(carView.render().$el);
		});
		return this;
	}
});
var BoatView = Backbone.View.extend({
	tagName: "li",

	render: function(){
		this.$el.html(this.model.get("type"));
		return this;
	}
});			

var BoatsView = Backbone.View.extend({
	tagName: "ul",
	
	render: function(){
		var that = this;
		this.model.each(function(boat){
			var boatView = new BoatView({ model: boat });
			that.$el.append(boatView.render().$el);
		});
		return this;
	}
});

var PlaneView = Backbone.View.extend({
	tagName: "li",

	render: function(){
		this.$el.html(this.model.get("type"));
		return this;
	}
});			

var PlanesView = Backbone.View.extend({
	tagName: "ul",
	
	render: function(){
		var that = this;
		this.model.each(function(plane){
			var planeView = new PlaneView({ model: plane });
			that.$el.prepend(planeView.render().$el);
		});
		return this;
	}
});

/*
	Routers
			*/


var AppRouter = Backbone.Router.extend({
	routes: {
		"cars": "viewCars",
		"boats": "viewBoats",
		"planes": "viewPlanes",
		"*other": "defaultRoute" 
	},

	viewCars: function(){
		$(".container").html("");
		var carsView = new CarsView({ el: ".container", model: cars});
		carsView.render();
	},

	viewBoats: function(){
		$(".container").html("");
		var boatsView = new BoatsView({ el: ".container", model: boats});
		boatsView.render();
	},

	viewPlanes: function(){
		$(".container").html("");
		var planesView = new PlanesView({ el: ".container", model: planes});
		planesView.render();
	},
	defaultRoute: function(){
		//this.$el.html("Nothing selected");
	}
});

var router = new AppRouter();
Backbone.history.start();

var NavView = Backbone.View.extend({
	events: {
		"click": "onListClick"
	},

	onListClick: function(e){
		var $li = $(e.target);
		router.navigate($li.attr("data-url"), {trigger: true});
	}
});

var navView = new NavView({ el: ".nav"});











