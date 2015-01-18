game.module(
	'game.main'
).require(
	'game.assets',
	'game.playbutton',
	'game.game'
).body(function() {

	game.createScene('Main', {
		backgroundColor: 0x33aa66,

		init: function() {
			var text = new game.BitmapText("Home alone Soccer", {font: 'font', align: 'left'});
			text.position = {
				x: game.system.width / 2 - text.width / 2,
				y: game.system.height /2 - text.height /2
			};

			var text2 = new game.BitmapText("Tap/Click to jump.", {font: 'font', align: 'left'});
			text2.position = {
				x: game.system.width + text2.width + 10,
				y: 125
			};

			var text3 = new game.BitmapText("Block the ball!", {font: 'font', align: 'left'});
			text3.position = {
				x: -text3.width - 10,
				y: game.system.height - 125
			};

			var playBtn = new game.Playbutton(game.system.width/2, game.system.height/2);

			var tween = new game.Tween(text.position);
			tween.to({y: 45}, 800);
			tween.easing(game.Tween.Easing.Elastic.In);

			var tween2 = new game.Tween(text2.position);
			tween2.to({x: game.system.width / 2 - text2.width / 2}, 1000);
			tween2.easing(game.Tween.Easing.Elastic.Out);

			var tween3 = new game.Tween(text3.position);
			tween3.to({x: game.system.width / 2 - text3.width / 2}, 1500);
			tween3.easing(game.Tween.Easing.Elastic.Out);

			tween2.chain(tween3);
			tween.chain(tween2);
			tween.start();

			this.stage.addChild(text);
			this.stage.addChild(text2);
			this.stage.addChild(text3);
		},

	});

});
