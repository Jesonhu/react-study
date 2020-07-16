import React from "react";
import ReactDOM from "react-dom";
import './styles.css'

/**
 * 商品类别标题
 */
class ProductCategoryRow extends React.Component {
  render() {
    const category = this.props.category
    const ccategory = this.props.ccategory
    return (
      <tr>
        <th colSpan="2">{ccategory}</th>
      </tr>
    )
  }
}

/**
 * 每行一个产品
 */
class ProductRow extends React.Component {
  render() {
    const product = this.props.product
    const name = product.stocked ?
      product.cname :
      <span style={{color: 'red'}}>{product.cname}</span>

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    )
  }
}

/** 展示数据内容并根据用户输入筛选结果 */
class ProductTable extends React.Component {
  render() {
    const rows = []
    let lastCategory = null
    this.props.products.forEach((product) => {
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow 
            category={product.category}
            ccategory={product.ccategory}
            key={product.category} />
        )
      }
      rows.push(
        <ProductRow 
          product={product}
          key={product.name} />
      )
      lastCategory = product.category
    })
    return (
      <table>
        <thead>
          <tr>
            <th>商品名</th>
            <th>价格</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    )
  }
}

/**
 * 用户输入
 */
class SearchBar extends React.Component {
  render() {
    return (
      <form>
        <div className="form-item">
          <input type="text" placeholder="Search..."/>
          <p>
            <input type="checkbox"/>
            {' '}
            只显示有货商品
          </p>
        </div>
      </form>
    )
  }
}

/**
 * 整个示例应用的整体
 */
class FilterableProductTable extends React.Component {
  render() {
    return (
      <div className="filterable-product-table">
        <SearchBar className="filterable-product-table__searchbar"/>
        <ProductTable className="filterable-product-table__product-table" 
          products={this.props.products}/>
      </div>
    )
  }
}

const productsList = [
  {category: "Sporting Goods", ccategory: "运动商品", price: "$49.99", stocked: true, name: "Football", cname: "足球"},
  {category: "Sporting Goods", ccategory: "运动商品", price: "$9.99", stocked: true, name: "Baseball", cname: "棒球"},
  {category: "Sporting Goods", ccategory: "运动商品", price: "$29.99", stocked: false, name: "Basketball", cname: '篮球'},
  {category: "Electronics", ccategory: "电子商品", price: "$99.99", stocked: true, name: "iPod Touch", cname: "iPod Touch" },
  {category: "Electronics", ccategory: "电子商品", price: "$399.99", stocked: false, name: "iPhone 5", cname: "iPhone 5"},
  {category: "Electronics", ccategory: "电子商品", price: "$199.99", stocked: true, name: "Nexus 7", cname: "Nexus 7"}
];

const rootElement = document.getElementById("root");
ReactDOM.render(<FilterableProductTable products={productsList} />, rootElement);
