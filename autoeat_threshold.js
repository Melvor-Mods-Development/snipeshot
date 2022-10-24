// Made for version 1.1 (rev 4526)

(function() {
	var player_autoeatThresholdUpdater = () => {
		if (game === undefined) return;
		if ($("#combat-player-chance-to-hit") && !(game.isPaused)) {
			let player_hp = game.combat.player.valueOf().stats.hitpoints;
			let player_ae_threshold = game.combat.player.autoEatThreshold;
			let player_ae_efficiency = game.combat.player.autoEatEfficiency;

			if ($("#hcco-autoEatField")[0] === undefined) {
				let autoEatFieldWrapper = $("<span>", { class: "font-w700 align-middle" });
				let autoEatField = $("<small>", { id: "hcco-autoEatField" });
				autoEatField.appendTo(autoEatFieldWrapper);
				autoEatField.appendTo("#combat-player-auto-eat");
				$(".auto-eat-icon").css({"margin-right": "0px", "margin-left": "10px"});
			}
			$("#hcco-autoEatField").html("("+player_ae_threshold+")");

			if ($("#hcco-autoEatFieldEnemy")[0] === undefined) {
				let playerAEThresholdLabel = $("<h5>", {
					class: "font-w400 font-size-sm text-combat-smoke m-1"
				});
				playerAEThresholdLabel.html("Player's AE threshold");

				let playerAEThresholdValue = $("<h5>", {
					class: "font-w600 font-size-sm text-combat-smoke text-right m-1"
				});
				let autoEatField = $("<span>", { id: "hcco-autoEatFieldEnemy" });
				autoEatField.appendTo(playerAEThresholdValue);

				let enemy_offense_box = $("#combat-enemy-strength-bonus").parent()

				let leftbox = $("<div>", { class: "col-8" });
				let rightbox = $("<div>", { class: "col-4" });

				playerAEThresholdLabel.appendTo(leftbox);
				playerAEThresholdValue.appendTo(rightbox);
				let enemyOffensiveStats = enemy_offense_box.parent().parent()[0]; // this is awful
				if (enemyOffensiveStats !== undefined) {
					leftbox.appendTo(enemyOffensiveStats);  
					rightbox.appendTo(enemyOffensiveStats);  
				}

			}
			
			$("#hcco-autoEatFieldEnemy").html(player_ae_threshold+"HP");
		}
	};

	console.log("[melvor_hcco/autoeat_threshold] Loading...");
	setTimeout( () => setInterval(player_autoeatThresholdUpdater , 50), 5000 );
	console.log("[melvor_hcco/autoeat_threshold] Done!");
})();
