angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('InicioCtrl', function($scope, Servico){
  //$scope.pessoas = Servico.pessoas();
  Servico.listar().success(function(resposta){
    $scope.servicos = resposta;
  }).error(function(resposta){
    console.log(resposta);
  });
})
//$stateParams: Capturar parametros no app.js (nas rotas)
.controller('PessoasCtrl', function($scope, $stateParams, Pessoa){
  var id = $stateParams.id;
  $scope.servico_id = id;
  Pessoa.listar(id)
  .success(function(resposta){
    $scope.pessoas = resposta;
  })
  .error(function(resposta){
    alert(resposta);
  });
})

//$stateParams: Capturar parametros no app.js (nas rotas)
.controller('PessoaCtrl', function($scope, $stateParams, Pessoa){
  var id = $stateParams.id;
  var servico_id = $stateParams.servico_id;
  Pessoa.visualizar(servico_id, id)
  .success(function(resposta){
    $scope.pessoa = resposta;
  })
  .error(function(resposta){
    alert(resposta);
  });
})

.controller('CadastrarCtrl', function($scope, Pessoa, Servico){
  Servico.listar().success(function(resposta){
    $scope.servicos = resposta;
  }).error(function(resposta){
    console.log(resposta);
  });
  $scope.pessoa = {};
  $scope.salvar = function(){
    var servicos = [];
    for (var i = 0; i < $scope.servicos.length; i++) {
      if($scope.servicos[i].selecionado){
        servicos.push($scope.servicos[i].id);  
      }
    }
    
    $scope.pessoa.servicos = servicos;

    Pessoa.salvar($scope.pessoa)
    .success(function(resposta){
      alert(resposta.mensagem)
    })
    .error(function(resposta){
      alert(resposta.mensagem)
    })
  }
})