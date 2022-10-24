// Made for version 1.1 (rev 4526)

(function() {
	var slayertask_extensionUpdater = () => {
		if (game === undefined) return;
		if ($("#combat-slayer-task-menu")[0] && !(game.isPaused)) {

			let task_extend_header = $("#combat-slayer-task-menu")[0].children[0].children[0].children[3].children[2];
			if ($("#extend_slayer_qty")[0] === undefined) {
				let extend_qty_label = $("<span>", { id: "extend_slayer_qty", class: "font-w400 font-size-sm" });
				extend_qty_label.appendTo(task_extend_header);
			}

			let extension_qty = (game.combat.slayerTask.tier+1)*(10+Math.floor(game.slayer.level/5));
			$("#extend_slayer_qty").html("(+"+extension_qty+" monsters)")
		}
	};

	console.log("[melvor_hcco/slayer_extension_info] Loading...");
	setTimeout( () => setInterval(slayertask_extensionUpdater , 50), 5000 );
	console.log("[melvor_hcco/slayer_extension_info] Done!");
})();
