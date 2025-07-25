// Login modal for dashboard
document.addEventListener('DOMContentLoaded', function() {
  // Create login modal if it doesn't exist
  if (!document.getElementById('login-modal')) {
    const modal = document.createElement('div');
    modal.id = 'login-modal';
    modal.className = 'login-modal';
    modal.innerHTML = `
      <div class="login-modal-content">
        <span class="close-modal">&times;</span>
        <div class="modal-icon"><i class="fas fa-user-lock"></i></div>
        <h3>Login Required</h3>
        <p>Please log in to add items to your cart.</p>
        <div class="modal-buttons">
          <button id="go-to-login" class="btn-primary">Go to Login</button>
          <button id="cancel-login" class="btn-secondary">Cancel</button>
        </div>
      </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .login-modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        z-index: 1000;
        justify-content: center;
        align-items: center;
      }
      .login-modal-content {
        background-color: white;
        padding: 30px;
        border-radius: 10px;
        text-align: center;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
      }
      .close-modal {
        float: right;
        font-size: 24px;
        cursor: pointer;
        color: #999;
      }
      .modal-icon {
        font-size: 48px;
        color: #0dd134;
        margin-bottom: 20px;
      }
      .modal-buttons {
        display: flex;
        justify-content: center;
        gap: 15px;
        margin-top: 20px;
      }
      .btn-primary {
        background-color: #0dd134;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
      }
      .btn-secondary {
        background-color: #f1f1f1;
        color: #333;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
      }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // Add event listeners
    document.querySelector('.close-modal').addEventListener('click', function() {
      document.getElementById('login-modal').style.display = 'none';
    });
    
    document.getElementById('go-to-login').addEventListener('click', function() {
      window.location.href = 'login.html';
    });
    
    document.getElementById('cancel-login').addEventListener('click', function() {
      document.getElementById('login-modal').style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
      const modal = document.getElementById('login-modal');
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  }
});