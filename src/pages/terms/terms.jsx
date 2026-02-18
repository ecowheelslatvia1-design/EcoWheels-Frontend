import React, { useEffect } from 'react';

export default function TermsAndConditions() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="warranty-page">
      <div className="warranty-container">
        {/* Header */}
        <div className="warranty-header">
          <h1>Terms and Conditions</h1>
          <div>
            Last Updated: February 18, 2026
          </div>
          <p>These Terms and Conditions (“Terms”) govern purchases made on www.ecowheels.shop and apply to all customers purchasing products or services from EcoWheels. By placing an order, you agree to these Terms.</p>
        </div>

        <section>
          <div className="section-card">
            <div className="section-header">
              <div className="section-accent green"></div>
              <h2>Company Information</h2>
            </div>
            Business Name: EcoWheels<br />
            Website: www.ecowheels.shop<br />
            Contact Email: ecowheelslatvia1@gmail.com<br />
            Registration No.: 40203705193<br />
            Legal Address: Dobele šoseja 2a, Latvia<br />
            EcoWheels operates in accordance with Latvian and EU consumer protection laws.
          </div>
        </section>

        <section>
            <div className="section-card">
                <div className="section-header">
                    <div className="section-accent green"></div>
                    <h2>Products</h2>
                </div>
                EcoWheels sells:<br />
                - Electric bicycles (e-bikes)<br />
                - Batteries and chargers<br />
                - Spare parts<br />
                - Accessories<br />
                Product images are for illustrative purposes only. Specifications may vary slightly from the final product.
            </div>
        </section>

         <section>
            <div className="section-card">
                <div className="section-header">
                    <div className="section-accent green"></div>
                    <h2>Orders & Contract Formation</h2>
                </div>
                A purchase contract is concluded when:<br />
                - Full payment is successfully received; OR<br />
                - Financing approval is confirmed by the selected financing provider.<br />
                EcoWheels reserves the right to cancel orders due to pricing errors, stock unavailability, or suspected fraud.
            </div>
        </section>

         <section>
            <div className="section-card">
                <div className="section-header">
                    <div className="section-accent green"></div>
                    <h2>Prices</h2>
                </div>
                All prices are listed in EUR and include VAT unless otherwise stated.
            </div>
         </section>

         <section>
            <div className="section-card">
                <div className="section-header">
                    <div className="section-accent green"></div>
                    <h2>Payment Methods</h2>
                </div>
                EcoWheels offers the following payment methods:<br />
                - Bank payments<br />
                - Card payments<br />
                - Buy Now Pay Later (BNPL)<br />
                - Instalment financing (EMI up to 72 months)<br />
                All online payments and financing solutions are provided via Montonio, which offers secure bank-link payments, card processing, BNPL solutions, and instalment financing with repayment periods up to 72 months (subject to approval).<br />
                When choosing BNPL or instalment financing, a separate credit agreement is concluded between the customer and the financing partner. Approval is subject to credit assessment, and repayment terms, interest rates, and fees are defined in the financing agreement. EcoWheels is not responsible for credit approval decisions or repayment disputes. Failure to meet repayment obligations may result in penalties and may affect your credit rating.
            </div>
         </section>

          <section>
            <div className="section-card">
                <div className="section-header">
                    <div className="section-accent green"></div>
                    <h2>Delivery</h2>
                </div>
                Delivery times are estimates and may vary. Risk transfers to the customer upon delivery of the goods. Customers must inspect products immediately upon receipt and notify EcoWheels of visible damage within 48 hours.
            </div>
         </section>

          <section>
            <div className="section-card">
                <div className="section-header">
                    <div className="section-accent green"></div>
                    <h2>Right of Withdrawal (14-Day Return Policy)</h2>
                </div>
                In accordance with EU and Latvian consumer law, customers have the right to withdraw from a distance purchase within 14 days of receiving the goods, under the following conditions:<br />
                - Product must be unused<br />
                - Returned in original packaging<br />
                - Include all accessories<br />
                Return shipping costs are borne by the customer unless the product is defective. Refunds are issued within 14 days after receiving the returned product.<br />
                The right of withdrawal does not apply to custom-built bikes, used or damaged goods, or products damaged due to improper use.
            </div>
         </section>

          <section>
            <div className="section-card">
                <div className="section-header">
                    <div className="section-accent green"></div>
                    <h2>Warranty</h2>
                </div>
                EcoWheels provides product warranty in accordance with manufacturer terms and Latvian consumer law. Warranty periods range from 12 to 24 months depending on the specific product model and manufacturer. Warranty covers manufacturing defects and non-conformity existing at the time of delivery, but does not cover normal wear and tear, battery capacity reduction from normal use, improper charging, water damage, accidental damage, unauthorized modifications, or improper maintenance. Proof of purchase is required for warranty claims.
            </div>
         </section>

          <section>
            <div className="section-card">
                <div className="section-header">
                    <div className="section-accent green"></div>
                    <h2>Limitation of Liability</h2>
                </div>
                EcoWheels is not liable for indirect or consequential damages, loss of profits, damage caused by improper use, or personal injury resulting from failure to follow safety instructions. Liability is limited to the purchase price of the product, except where mandatory law provides otherwise.
            </div>
         </section>

          <section>
            <div className="section-card">
                <div className="section-header">
                    <div className="section-accent green"></div>
                    <h2>Product Use & Safety</h2>
                </div>
                Customers must follow local traffic regulations, use appropriate safety equipment, and maintain the e-bike properly. Improper use may void warranty.
            </div>
         </section>

          <section>
            <div className="section-card">
                <div className="section-header">
                    <div className="section-accent green"></div>
                    <h2>Data Protection</h2>
                </div>
                EcoWheels processes personal data in accordance with GDPR (EU 2016/679) and Latvian Data Protection Law. When using Montonio financing or payment services, personal data is processed under Montonio’s privacy policy and the relevant financing provider’s terms.
            </div>
         </section>

          <section>
            <div className="section-card">
                <div className="section-header">
                    <div className="section-accent green"></div>
                    <h2>Dispute Resolution</h2>
                </div>
                Consumers may submit complaints to EcoWheels via email. If a dispute cannot be resolved, consumers may contact the Consumer Rights Protection Centre of Latvia (PTAC). Disputes shall be resolved in the courts of the Republic of Latvia.
            </div>
         </section>

          <section>
            <div className="section-card">
                <div className="section-header">
                    <div className="section-accent green"></div>
                    <h2>Amendments</h2>
                </div>
                EcoWheels reserves the right to update these Terms at any time. Updated versions will be published on www.ecowheels.shop.
            </div>
         </section>

        </div>
    </div>
  );
}
