// Made for version 1.1 (rev 4526)

(function() {
	function get_enemy_max_hit() {
		// TODO: should account for specials too. doesn't currently
		return game.combat.enemy.valueOf().stats.maxHit;
	}

	var enemy_maxHitUpdater = () => {
		if (game === undefined) return;
		if ($("#combat-enemy-strength-bonus") && !(game.isPaused)) {
			let enemy_max_hit = get_enemy_max_hit();
			let ae_threshold = game.combat.player.autoEatThreshold;

			$("#combat-enemy-strength-bonus").css("display", "none");
			if ($("#combat-enemy-strength-bonus-better")[0] === undefined) {
				let combat_enemy_strength_bonus = $("<span>", { id: "combat-enemy-strength-bonus-better" });
				combat_enemy_strength_bonus.appendTo($("#combat-enemy-strength-bonus").parent()[0]);
			}
			$("#combat-enemy-strength-bonus-better").html(enemy_max_hit);
			if (enemy_max_hit >= ae_threshold) {
				$("#combat-enemy-strength-bonus-better").css("color", "#FF0000");
			} else {
				$("#combat-enemy-strength-bonus-better").css("color", "#FFFFFF");
			}
		}
	};

	console.log("[melvor_hcco/maxhit_highlight] Loading...");
	setTimeout( () => setInterval(enemy_maxHitUpdater, 50), 5000 );
	console.log("[melvor_hcco/maxhit_highlight] Done!");
})();
