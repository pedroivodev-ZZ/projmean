(function () {
  angular.module('primeiraApp').controller('BillingCyclesCtrl', [
    '$http',
    'messages',
    'tabs',
    BillingCyclesController
  ])

  function BillingCyclesController($http, messages, tabs) {
    const vm = this
    const url = 'http://localhost:3004/api/billingCycles'

    vm.refresh = function () {
      $http.get(url).then(function (response) {
        vm.billingCycle = { credits:[{}], debits:[{}] }
        vm.billingCycles = response.data
        tabs.show(vm, {tabList: true, tabCreate: true})
      })
    }

    vm.create = function () {
      $http.post(url, vm.billingCycle)
      .then(function (repsonse) {
        vm.refresh()
        vm.tabCreate = false
        messages.addSuccess('Operação realizada com sucesso')
      }).catch(function (response) {
        messages.addError(response.data.errors)
      })
    }

    vm.showTabUpdate = function (billingCycle) {
      vm.billingCycle = billingCycle
      tabs.show(vm, { tabUpdate: true })
    }

    vm.showTabDelete = function (billingCycle) {
      vm.billingCycle = billingCycle
      tabs.show(vm, { tabDelete: true })
    }

    vm.update = function () {
      $http.put(`${url}/${vm.billingCycle._id}`, vm.billingCycle).then(function (repsonse) {
        vm.refresh()
        messages.addSuccess('Operação realizada com sucesso')
      }).catch(function (response) {
        messages.addError(response.data.errors)
      })
    }

    vm.delete = function () {
      $http.delete(`${url}/${vm.billingCycle._id}`, vm.billingCycle).then(function (response) {
        vm.refresh()
        messages.addSuccess('Operação realizada com sucesso')
      }).catch(function (repsonse) {
        messages.addError(response.data.errors)
      })
    }

    vm.addCredit = function (index) {
      vm.billingCycle.credits.splice(index + 1, 0, {})
    }

    vm.cloneCredit = function (index, {name, value}) {
      vm.billingCycle.credits.splice(index + 1, 0, {name, value})
    }

    vm.deleteCredit = function (index, {name, value}) {
      if (vm.billingCycle.credits.length > 1) {
        vm.billingCycle.credits.splice(index, 1)
      }
    }

    vm.addDebit = function (index) {
      vm.billingCycle.debits.splice(index + 1, 0, {})
    }

    vm.cloneDebit = function (index, {name, value, status}) {
      vm.billingCycle.debits.splice(index + 1, 0, {name, value, status})
    }

    vm.deleteDebit = function (index, {name, value}) {
      if (vm.billingCycle.debits.length > 1) {
        vm.billingCycle.debits.splice(index, 1)
      }
    }

    vm.refresh()
  }
})()
