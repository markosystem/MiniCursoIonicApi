angular.module('starter.factories', [])

.factory('Servico', function($http, API){
	var servico = {};
	servico.pessoas = function(){
	var pessoas = [
	    {
	      nome: 'João'
	    },
	    {
	      nome: 'Alberto'
	    },
	    {
	      nome: "Pedro"
	    },
	  ];
	  return pessoas;
	}

	servico.listar = function(){
		return $http.get(API +'/servicos')
	}
	return servico;
})

.factory('Pessoa', function($http, API){
	return {
		listar: function(id){
			return $http.get(API +'/servicos/'+id+'/prestadores') 
		},
		salvar: function(pessoa){
			return $http.post(API + '/servicos/1/prestadores', pessoa)
		}
	}
})