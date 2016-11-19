angular.module('starter.factories', [])

.factory('Servico', function($http, API){
	return {
		listar: function(){
			return $http.get(API +'/servicos');
		}
	}
})

.factory('Pessoa', function($http, API){
	return {
		listar: function(id){
			return $http.get(API +'servicos/'+id+'/pessoas');
		},
		salvar: function(pessoa){
			return $http.post(API + 'servicos/pessoas', pessoa);
		},
		visualizar: function(servico_id, pessoa_id){
			return $http.get(API +'servicos/' + servico_id + '/pessoas/' + pessoa_id);
		}
	}
})