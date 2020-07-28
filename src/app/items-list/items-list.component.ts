import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import dataList from './../../assets/data.json';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})

export class ItemsListComponent implements OnInit {

  constructor() { }

  title = 'A sua lista de items';
  email = history.state.email;
  nome = new FormControl('');
  quantidade = new FormControl('');
  preco = new FormControl('');
  data = JSON.parse(JSON.stringify(dataList));
  totalQuantity = 0;
  totalPrice = "0";
  nameHasError = undefined;
  quantityHasError = undefined;
  costHasError = undefined;
  submited = false;

  ngOnInit(): void {
    this.totalQuantity = this.getTotalQuantity();
    this.totalPrice = this.getTotalPrice().toFixed(2);
    this.getDataOrdered();
  }

  ngDoCheck() {
    if (this.data.length === 0) {
      this.title = "Adicione o seu primeiro item";
    }
    this.totalQuantity = this.getTotalQuantity();
    this.totalPrice = this.getTotalPrice().toFixed(2);
    this.getDataOrdered();
    if (this.submited) {
      this.getErrors();
    }

  }

  onClickAddItem = () => {
    this.getErrors();
    this.submited = true;
    if (!this.quantityHasError && !this.costHasError && !this.nameHasError) {
      this.data.push({
        id: Math.random().toString(16).substring(2), name: this.nome.value, cost: "$" + this.preco.value, quantity: this.quantidade.value
      });
      this.nome.setValue("");
      this.quantidade.setValue("");
      this.preco.setValue("");
      this.submited = false;
    }
  }

  onClickRemoveItem = (id) => {
    this.data.forEach((element, index) => {
      if (element.id === id) {
        this.data.splice(index, 1);
      }
    });
  }

  getTotalQuantity = () => {
    let totalValue = 0;
    this.data.forEach(element => {
      totalValue += element.quantity;
    });
    return totalValue;
  }

  getTotalPrice = () => {
    let totalPrice = 0;
    let patternNumbers = /[\d|,|.|e|E|\+]+/g;
    this.data.forEach(element => {
      var number = parseFloat(element.cost.match(patternNumbers));
      totalPrice += number;
    });
    return totalPrice;
  }

  getDataOrdered = () => {
    this.data.sort((a, b) => a.name.localeCompare(b.name));
  }

  getErrors = () => {
    if (this.nome.value === "") {
      this.nameHasError = "Não pode estar vazio";
    }
    else {
      this.nameHasError = undefined;
    }
    if (this.preco.value < 0 || this.preco.value === "" || this.preco.value === null || isNaN(this.preco.value)) {
      this.costHasError = "Custo Inválido";
    }
    else {
      this.costHasError = undefined;
    }
    if (this.quantidade.value < 0 || this.quantidade.value === "" || this.quantidade.value === null || isNaN(this.quantidade.value)) {
      this.quantityHasError = "Quantidade Inválida";
    }
    else {
      this.quantityHasError = undefined;
    }
  }

}
