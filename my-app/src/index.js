import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import Popper from 'popper.js';

class ProductCategoryRow extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan="2">
          {category}
        </th>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ?
      product.name :
      <span style={{color: 'red'}}>
        {product.name}
      </span>;

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const rows = [];
    let lastCategory = null;
    
    this.props.products.forEach((product) => {
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category} />
        );
      }
      rows.push(
        <ProductRow
          product={product}
          key={product.name} />
      );
      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="Search..." />
        <p>
          <input type="checkbox" />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}


class FilterableProductTable extends React.Component {
  render() {
    return (
      <div>
        <SearchBar />
        <ProductTable products={this.props.products} />
      </div>
    );
  }
}



class Dropdown extends React.Component {
  state = {
    isOpen: false
  };

  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;
    return (
      <div className="dropdown" onClick={this.toggleOpen}>
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
        >
          Dropdown
        </button>
        <div className={menuClass} aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="#nogo">
            Item 1
          </a>
          <a className="dropdown-item" href="#nogo">
            Item 2
          </a>
          <a className="dropdown-item" href="#nogo">
            Item 3
          </a>
        </div>
      </div>
    );
  }
}

class BasicDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
  }

  onTrigger = (event) => {
    this.props.parentCallback(event.target.myname.value);
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    console.log("value: ", event.target.value)
  }

  render() {
    var Cateories = [
      {categoryName: 'Offensive effects', effects: [['Attack (single)', attackSingle], ['Attack (Multiple)', attackSingle], ['Predetermined attack', attackSingle], ['Counter attack', attackSingle], ['Combat Maneuvers (Single)', attackSingle], ['Combat Maneuvers (Single)', attackSingle], ['Indirect attack', attackSingle], ['Camouflage attack', attackSingle]] },
      {categoryName: 'Defensive effects', effects: [['Attack (single)', attackSingle], ['Attack (Multiple)', attackSingle], ['Predetermined attack', attackSingle], ['Counter attack', attackSingle], ['Combat Maneuvers (Single)', attackSingle], ['Combat Maneuvers (Single)', attackSingle], ['Indirect attack', attackSingle], ['Camouflage attack', attackSingle]] }
    ];

    function MakeItem(categoryList) {
      var newRows = []
      console.log("categoryList.length is ", categoryList.length)
      for (let i = 0; i < categoryList.length; i++) {
        console.log("categoryList[i].categoryName is :", categoryList[i].categoryName);
        newRows.push(<option key={categoryList[i].categoryName} value={categoryList[i].categoryName}>{categoryList[i].categoryName}</option>);
      };
      return newRows
    };

    return (
      <select value={this.state.value} onChange={this.handleChange}>
        {(MakeItem(Cateories))}
      </select>
    );
  }
}

class TechniqueName extends React.Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="Name" />
      </form>
    );
  }
}

class TechniqueCreationTable extends React.Component {
  state = {
    selectedCategory: "",
    ability1: "",
    ability2: ""
   }

  render() {
    const {name} = this.state;
    return (
      <div>
        <TechniqueName />
        <BasicDropdown />
        <ProductTable products={this.props.products} />
      </div>
    );
  }
}


const attackSingle = [
  {Bonus: '+10', primary: 2, secondary: 4, MK: 5, Maintainance: 1, level: 1 },
  {Bonus: '+25', primary: 3, secondary: 5, MK: 5, Maintainance: 2, level: 1 },
  {Bonus: '+40', primary: 4, secondary: 6, MK: 10, Maintainance:3, level: 1 }
];

const Cateories = [
  {categoryName: 'Offensive effects', effects: [['Attack (single)', attackSingle], ['Attack (Multiple)', attackSingle], ['Predetermined attack', attackSingle], ['Counter attack', attackSingle], ['Combat Maneuvers (Single)', attackSingle], ['Combat Maneuvers (Single)', attackSingle], ['Indirect attack', attackSingle], ['Camouflage attack', attackSingle]] }
];



const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];
 
ReactDOM.render(
  <TechniqueCreationTable products={PRODUCTS} />,
  document.getElementById('container')
);