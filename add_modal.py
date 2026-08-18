import os
import re

path = r"c:\Users\LOKII_1526\Desktop\SnapWash\pages\dashboard.html"

with open(path, "r", encoding="utf-8") as f:
    content = f.read()

css = """
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }
    .modal-overlay.show {
      opacity: 1;
      visibility: visible;
    }
    .modal-content {
      width: 90%;
      max-width: 500px;
      transform: translateY(20px);
      transition: transform 0.3s ease;
      position: relative;
    }
    .modal-overlay.show .modal-content {
      transform: translateY(0);
    }
    .payment-step { display: none; }
    .payment-step.active { display: block; }
"""
if ".modal-overlay {" not in content:
    content = content.replace("  </style>", css + "  </style>")

html = """
      <!-- Payment Modal -->
      <div class="modal-overlay" id="payment-modal">
        <div class="modal-content tracking-card" style="margin-bottom: 0;">
          <button onclick="closePaymentModal()" style="position: absolute; right: 1.5rem; top: 1.5rem; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--text-muted);"><i class="ri-close-line"></i></button>
          
          <!-- Step 1: Review -->
          <div id="payment-step-1" class="payment-step active">
            <h3 style="margin-bottom: 1.5rem;">Review Payment</h3>
            <div class="order-row" style="margin-bottom: 2rem; border-color: var(--primary);">
              <div>
                <h4 style="margin: 0;">Invoice #INV-8619</h4>
                <div class="order-meta" style="margin-top: 0.25rem;">Couture Care &middot; Jun 25, 2026</div>
              </div>
              <strong>$96.00</strong>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 1.2rem; font-weight: 600; margin-bottom: 2rem;">
              <span>Total Due</span>
              <span class="text-accent">$96.00</span>
            </div>
            <button class="btn btn-primary" style="width: 100%;" onclick="goToPaymentStep(2)">Proceed to Payment <i class="ri-arrow-right-line" style="margin-left: 0.5rem;"></i></button>
          </div>

          <!-- Step 2: Card Details -->
          <div id="payment-step-2" class="payment-step">
            <h3 style="margin-bottom: 1.5rem;">Payment Details</h3>
            <div class="form-group" style="margin-bottom: 1rem;">
              <label class="form-label">Cardholder Name</label>
              <input type="text" class="form-control" value="Elena Vasquez">
            </div>
            <div class="form-group" style="margin-bottom: 1rem;">
              <label class="form-label">Card Number</label>
              <div style="position: relative;">
                <i class="ri-bank-card-line" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--text-muted);"></i>
                <input type="text" class="form-control" placeholder="0000 0000 0000 0000" style="padding-left: 2.5rem;">
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem;">
              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label">Expiry Date</label>
                <input type="text" class="form-control" placeholder="MM/YY">
              </div>
              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label">CVC</label>
                <input type="text" class="form-control" placeholder="123">
              </div>
            </div>
            <div style="display: flex; gap: 1rem;">
              <button class="btn btn-outline" style="width: 50%;" onclick="goToPaymentStep(1)">Back</button>
              <button class="btn btn-primary" id="confirm-pay-btn" style="width: 50%;" onclick="processFinalPayment()">Pay $96.00</button>
            </div>
          </div>
          
        </div>
      </div>
"""
if 'id="payment-modal"' not in content:
    content = content.replace("    </main>", html + "    </main>")

js = """
    let payBtnRef = null;

    function payOutstanding(btn) {
      payBtnRef = btn;
      document.getElementById('payment-modal').classList.add('show');
      goToPaymentStep(1);
    }

    function closePaymentModal() {
      document.getElementById('payment-modal').classList.remove('show');
    }

    function goToPaymentStep(step) {
      document.querySelectorAll('.payment-step').forEach(el => el.classList.remove('active'));
      document.getElementById('payment-step-' + step).classList.add('active');
    }

    function processFinalPayment() {
      const btn = document.getElementById('confirm-pay-btn');
      btn.innerHTML = '<i class="ri-loader-4-line" style="animation: spin 1s linear infinite; display: inline-block;"></i> Processing...';
      btn.disabled = true;
      
      // Stage 1: Processing
      setTimeout(() => {
        // Stage 2: Success
        btn.innerHTML = 'Payment Successful <i class="ri-checkbox-circle-line" style="margin-left: 4px;"></i>';
        btn.style.backgroundColor = 'var(--success)';
        btn.style.borderColor = 'var(--success)';
        
        document.querySelectorAll('.status-chip.unpaid, .status-chip.pending').forEach(chip => {
          chip.className = 'status-chip paid';
          chip.textContent = 'Paid';
        });

        // Hide button and close modal after success
        setTimeout(() => {
          closePaymentModal();
          if (payBtnRef) {
            payBtnRef.style.opacity = '0';
            payBtnRef.style.transition = 'opacity 0.5s ease';
            setTimeout(() => payBtnRef.style.display = 'none', 500);
          }
        }, 1500);
      }, 1500);
    }
"""

pattern = r"function payOutstanding\(btn\)\s*\{.*?\n    \}"
content = re.sub(pattern, js.strip(), content, flags=re.DOTALL)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Done")
