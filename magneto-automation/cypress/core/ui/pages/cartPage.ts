class CartPage {
  visit() {
    cy.visit("/checkout/cart");
  }
 
  getAndVerifyTotalPrice() {
    let calculatedTotal = 0;
    
    cy.get("tbody.cart.item tr.item-info").each(($row) => {
      // Get price
      const priceText = $row.find("td.col.price .price").text().trim();
      const price = parseFloat(priceText.replace("$", "").replace(",", ""));

      // Get quantity
      const qtyText = $row.find("td.col.qty input").val();
      const qty = parseInt(String(qtyText))

      // Get subtotal
      const displayedSubtotalText = $row
        .find("td.col.subtotal .price")
        .text()
        .trim();
      const displayedSubtotal = parseFloat(
        displayedSubtotalText.replace("$", "").replace(",", "")
      );

      // Calculate expected subtotal
      const expectedSubtotal = price * qty;
      calculatedTotal += expectedSubtotal;

      // Assert each row subtotal
      expect(displayedSubtotal).to.equal(expectedSubtotal);
    });

    // Now verify overall Subtotal, Tax, and Order Total
    cy.get("tr.totals.sub .price")
      .invoke("text")
      .then((subtotalText) => {
        const displayedSubtotal = parseFloat(subtotalText.replace("$", "").replace(",", ""));
        expect(displayedSubtotal).to.equal(calculatedTotal);
      });

    cy.get("tr.totals-tax .price")
      .invoke("text")
      .then((taxText) => {
        const tax = parseFloat(taxText.replace("$", "")) || 0;

        cy.get("tr.grand.totals .price")
          .invoke("text")
          .then((grandTotalText) => {
            const displayedGrandTotal = parseFloat(
              grandTotalText.replace("$", "").replace(",", "")
            );
            const expectedGrandTotal = calculatedTotal + tax;

            expect(displayedGrandTotal).to.equal(expectedGrandTotal);
          });
      });
  }
}
export const cartPage = new CartPage();
