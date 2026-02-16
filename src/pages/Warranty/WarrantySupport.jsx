import React, { useEffect } from 'react';
import './WarrantySupport.css';

export default function WarrantySupport() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="warranty-page">
      <div className="warranty-container">
        {/* Header */}
        <div className="warranty-header">
          <h1>Warranty & Technical Support</h1>
          <p>Your comprehensive guide to warranty coverage and support services</p>
        </div>

        {/* Warranty Approach Section */}
        <section>
          <div className="section-card">
            <div className="section-header">
              <div className="section-accent green"></div>
              <h2>Warranty Approach</h2>
            </div>
            <ol className="warranty-list numbered">
              <li>We generally replace parts instead of repairing them to minimize your waiting time.</li>
              <li>The same warranty service is available whether you purchase from our official website, authorized offline stores, or officially partnered online platforms.</li>
              <li>Parts that meet the warranty conditions outlined on this page will be fully covered at no cost.</li>
              <li>Parts outside the warranty can still be repaired/replaced, but a fee will apply. For specific fee details, please contact <a href="mailto:ecowheelslatvia1@gmail.com" className="warranty-link">ecowheelslatvia1@gmail.com</a>.</li>
              <li>Incidental expenses during repair, such as substitute transport, fuel, or ride-sharing, are not covered under warranty.</li>
            </ol>
          </div>
        </section>

        {/* Lifetime Technical Support Section */}
        <section>
          <div className="section-card gradient-green">
            <div className="section-header">
              <div className="section-accent green"></div>
              <h2>Lifetime Technical Support</h2>
            </div>
            <ol className="warranty-list numbered">
              <li>Our technical experts provide professional assistance with tailored solutions for complex issues.</li>
              <li>1-on-1 support: A dedicated support agent will handle all your inquiries, ensuring personalized assistance throughout.</li>
              <li>This service is available anytime, regardless of your warranty status. <span className="note-text">(Note: After the warranty period, customers are responsible for the cost of replacement parts.)</span></li>
            </ol>
          </div>
        </section>

        {/* What Qualifies for Warranty Section */}
        <section>
          <div className="section-card">
            <div className="section-header">
              <div className="section-accent blue"></div>
              <h2>What Qualifies for Warranty?</h2>
            </div>
            <div className="info-box">
              <p>All conditions must be met simultaneously:</p>
            </div>
            <ol className="warranty-list numbered">
              <li>Products purchased from EcoWheels' official store or authorized resellers.</li>
            </ol>
            <div className="note-box">
              <p>
                To qualify for warranty service on a pre-owned product, the customer must provide a valid proof of purchase from an authorized or legitimate source. The warranty period is calculated from the date the product was originally sold by EcoWheels to the first end consumer and confirmed as received.
              </p>
            </div>
            <ol className="warranty-list numbered" start="2">
              <li>Product/component is within the warranty period (see the table below).</li>
              <li>Manufacturing flaws and inherent product issues, like material defects, are covered under warranty.</li>
              <li>The warranty card is present and matches the product.</li>
            </ol>
          </div>
        </section>

        {/* What Does Not Qualify for Warranty Section */}
        <section>
          <div className="section-card border-red">
            <div className="section-header">
              <div className="section-accent red"></div>
              <h2>What Does Not Qualify for Warranty?</h2>
            </div>
            <ol className="warranty-list numbered">
              <li>
                Failure of consumable or wear-and-tear parts, including:
                <ul className="warranty-list bulleted">
                  <li>Brake pads, plastic components, spokes, rims, brake cables, and surface scratches.</li>
                </ul>
              </li>
              <li>Damaged wires or accessories with visible scratches or breaks.</li>
              <li>
                Malfunctions caused by improper use, such as:
                <ul className="warranty-list bulleted">
                  <li>Not following the User Manual for usage, maintenance, or adjustments.</li>
                  <li>Unauthorized disassembly, repair, or modifications.</li>
                  <li>Improper usage or storage.</li>
                </ul>
              </li>
              <li>Damage due to accidents.</li>
              <li>Minor scratches or accessory damage sustained during shipping.</li>
              <li>Repair costs from non-authorized repair shops are not covered.</li>
            </ol>
          </div>
        </section>

        {/* Warranty Periods and Conditions Section */}
        <section>
          <div className="section-card">
            <div className="section-header">
              <div className="section-accent purple"></div>
              <h2>Warranty Periods and Conditions for Different Components</h2>
            </div>

            {/* Mechanical Components Table */}
            <div className="table-wrapper">
              <table className="warranty-table">
                <thead>
                  <tr>
                    <th colSpan="3" className="table-header-mechanical">
                      <div>Mechanical Components</div>
                      <div className="table-subtitle">(Non-electrical and electricity-independent parts)</div>
                    </th>
                  </tr>
                  <tr>
                    <th>Components</th>
                    <th>Warranty Period</th>
                    <th>
                      <div>Warranty-Covered</div>
                      <div>& Non-Covered Situations</div>
                      <div className="table-subtitle">(This list is not exhaustive)</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Frame</td>
                    <td>
                      <span className="warranty-badge green">36 months</span>
                    </td>
                    <td>
                      <div className="coverage-section">
                        <div className="coverage-title covered">✓ Covered:</div>
                        <div className="coverage-list">
                          <div>• Natural deformation</div>
                          <div>• Open welds</div>
                          <div>• Desoldering fractures</div>
                          <div>• Manufacturing defects</div>
                        </div>
                      </div>
                      <div className="coverage-section">
                        <div className="coverage-title not-covered">✗ Non-covered:</div>
                        <div className="coverage-list">
                          <div>• Self-modification</div>
                          <div>• Collision damage</div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="component-category orange">Structural Components</div>
                      <div className="component-details">Fork, Handlebar, Stem, Seatpost</div>
                    </td>
                    <td rowSpan="2">
                      <span className="warranty-badge blue">24 months</span>
                    </td>
                    <td rowSpan="2">
                      <div className="coverage-section">
                        <div className="coverage-title not-covered">✗ Non-covered:</div>
                        <div className="coverage-list">
                          <div>• Tire puncture from sharp objects</div>
                          <div>• Damage to spare parts from collisions</div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="component-category orange">Power and Wheel Components</div>
                      <div className="component-details"><strong>Drivetrain and Shifting:</strong><br/>Chainring, Chain, Cassette, Bottom Bracket, Shifters, Derailleurs</div>
                      <div className="component-details"><strong>Wheel Assembly:</strong><br/>Hubs, Rims, Spokes</div>
                      <div className="component-details"><strong>Suspension:</strong><br/>Shock Absorber</div>
                      <div className="component-details"><strong>Brake:</strong><br/>Front and Rear Brake</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="component-category orange">Support and Safety Components</div>
                      <div className="component-details"><strong>Fasteners:</strong><br/>Seat Clamp, Stem Clamp, Frame Clamp</div>
                      <div className="component-details"><strong>Tires and Saddle:</strong><br/>Tires, Saddle</div>
                      <div className="component-details"><strong>Protection and Braking:</strong><br/>Fenders, Safety Hook, Pedals, Brakes, Brake Discs, Brakes Pads, Brake Levers, Kickstand</div>
                    </td>
                    <td>
                      <span className="warranty-badge yellow">3 months</span>
                    </td>
                    <td>
                      <div className="coverage-section">
                        <div className="coverage-title not-covered">✗ Non-covered:</div>
                        <div className="coverage-list">
                          <div>• Self-modification</div>
                          <div>• Collision</div>
                          <div>• Damage of parts and accessories</div>
                          <div>• Man-made damages</div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Electrical System Table */}
            <div className="table-wrapper">
              <table className="warranty-table">
                <thead className="electrical-header">
                  <tr>
                    <th colSpan="3" className="table-header-electrical">
                      Electrical System
                    </th>
                  </tr>
                  <tr>
                    <th>Components</th>
                    <th>Warranty Period</th>
                    <th>
                      <div>Warranty-Covered</div>
                      <div>& Non-Covered Situations</div>
                      <div className="table-subtitle">(This list is not exhaustive)</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="component-category blue">Motor Components</div>
                      <div className="component-details">Motor, Hall, Bearing, Clutch</div>
                    </td>
                    <td>
                      <span className="warranty-badge blue">24 months</span>
                    </td>
                    <td>
                      <div className="coverage-section">
                        <div className="coverage-title covered">✓ Covered:</div>
                        <div className="coverage-list">
                          <div>• Phase loss</div>
                          <div>• Hall element burnout</div>
                          <div>• Demagnetization</div>
                          <div>• Abnormal bearing noise</div>
                        </div>
                      </div>
                      <div className="coverage-section">
                        <div className="coverage-title not-covered">✗ Non-covered:</div>
                        <div className="coverage-list">
                          <div>• Breakage</div>
                          <div>• Water ingress</div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="component-category blue">Battery</div>
                      <div className="component-details">Lithium battery</div>
                    </td>
                    <td>
                      <span className="warranty-badge blue">24 months</span>
                    </td>
                    <td>
                      <div className="coverage-section">
                        <div className="coverage-title covered">✓ Covered:</div>
                        <div className="coverage-list">
                          <div>• Broken grids</div>
                          <div>• Lack of power storage</div>
                          <div>• Capacity below 70%</div>
                        </div>
                      </div>
                      <div className="coverage-section">
                        <div className="coverage-title not-covered">✗ Non-covered:</div>
                        <div className="coverage-list">
                          <div>• Water ingress</div>
                          <div>• Man-made damage</div>
                          <div>• Battery left uncharged for over a month, leading to failure</div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="component-category blue">Electrical Components</div>
                      <div className="component-details"><strong>Charging:</strong><br/>Charger, Main wiring harness</div>
                      <div className="component-details"><strong>Display and controller:</strong><br/>Display, Controller</div>
                    </td>
                    <td>
                      <span className="warranty-badge blue">24 months</span>
                    </td>
                    <td rowSpan={3}>
                      <div className="coverage-section">
                        <div className="coverage-section">
                        <div className="coverage-title covered">✓ Covered:</div>
                        <div className="coverage-list">
                          <div>• Short circuit</div>
                          <div>• Burnout</div>
                          <div>• Performance failure caused by manufacturing faults</div>
                        </div>
                      </div>
                      <div className="coverage-title not-covered">✗ Non-covered:</div>
                        <div className="coverage-list">
                          <div>• Water exposure</div>
                          <div>• Disconnection</div>
                          <div>• Man-made damages</div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="component-details"><strong>Speed control:</strong><br/>Speed control knob, Booster</div>
                    </td>
                    <td>
                      <span className="warranty-badge blue">24 months</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="component-details"><strong>Lights:</strong><br/>Headlights, Taillights</div>
                      <div className="component-details"><strong>Braking:</strong><br/>Power-off brake levers, Switches</div>
                    </td>
                    <td>
                      <span className="warranty-badge yellow">3 months</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* How to Claim Your Warranty Section */}
        <section>
          <div className="section-card">
            <div className="section-header">
              <div className="section-accent indigo"></div>
              <h2>How to Claim Your Warranty?</h2>
            </div>

            <div className="claim-step">
              <div className="claim-step-header">
                <span className="step-number">1</span>
                <h3>Products Purchased From EcoWheels' Official Website</h3>
              </div>
              <ol className="warranty-list numbered">
                <li>Send product info to EcoWheels by clicking <a href="/service-bike" className="warranty-link blue">here</a>.</li>
                <li>After reviewing your claim, we will provide replacement parts and/or installation and adjustment instructions as needed.</li>
              </ol>
              <div className="warning-box">
                <div className="warning-content">
                  <span className="warning-icon">⚠️</span>
                  <span>Important Note: Any product returned without prior approval will not be accepted or covered by warranty.</span>
                </div>
              </div>
            </div>

            <div className="claim-step purple">
              <div className="claim-step-header">
                <span className="step-number purple">2</span>
                <h3>Products Purchased From Stores Or Platforms Other Than Our Official Website</h3>
              </div>
              <p>
                Customers who purchase from our authorized dealers are entitled to the same warranty service, but the service must be handled through the dealer. For warranty service, please contact the platform or dealer where you purchased the product.
              </p>
            </div>

            <div className="contact-box">
              <p>
                For any further questions about the warranty, please contact us via <a href="mailto:ecowheelslatvia1@gmail.com" className="warranty-link">ecowheelslatvia1@gmail.com</a>.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
