//!Author Stefan Nygren <Stefan.nygren@hiq.se>

JUCI.app
.controller("dropbearSettings", function($scope, $uci, $systemService, $network,$tr,gettext){
	$scope.data = {

	};
	
	$systemService.find("dropbear").done(function(service){
		$scope.service = service;
		$scope.$apply();
	});
	$uci.$sync("dropbear").done(function(){
		if($uci.dropbear){
			$scope.dropbear = $uci.dropbear["@dropbear"];
			$scope.$apply();
		}

	});
	
	$scope.getTitle = function(cfg){
		return $tr(gettext("Dropbear Instance ")) + cfg[".name"];
	}

	$scope.onAddInstance = function(){
		$uci.dropbear.create({
			".type":"dropbear",
			
		}).done(function() {
			$scope.$apply();
			$uci.save();
		});
	}
	$scope.onDeleteInstance = function(ins){
		if(!ins) alert($tr(gettext("Please select a instance in the list to remove")));
		if($scope.dropbear.length <= 0) {
			alert($tr(gettext("Unable to remove last instance")));
		} else {
		 	 if(confirm($tr(gettext("Are you sure you want to remove this instance?")))){
				ins.$delete().done(function(){
					$scope.$apply();
				});
		 	}
		}
	}

	$scope.onServiceEnableDisable = function(enabled){
		if(!$scope.service) return;
		if($scope.service.enabled){
			$scope.service.disable().always(function(){ $scope.$apply(); });
		} else {
			$scope.service.enable().always(function(){ $scope.$apply(); });
		}
	}
	$scope.onStartStopService = function(){
		if(!$scope.service) return;
		if($scope.service.running){
			$scope.service.stop().always(function(){ $scope.$apply(); });
		} else {
			$scope.service.start().always(function(){ $scope.$apply(); });
		}
	}
});
