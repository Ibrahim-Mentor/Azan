document.addEventListener("DOMContentLoaded", () => {
    // Modal open/close logic (will be unused but is harmless)
    document.querySelectorAll("[data-modal-target]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const modal = document.getElementById(btn.dataset.modalTarget);
        if (modal) modal.classList.add("active");
      });
    });

    document.querySelectorAll("[data-modal-close]").forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.closest(".modal-overlay").classList.remove("active");
      });
    });

    // Mobile nav toggle
    const mobileNavToggle = document.getElementById("mobileNavToggle");
    const headerNav = document.getElementById("headerNav");

    if(mobileNavToggle) {
        mobileNavToggle.addEventListener("click", () => {
            headerNav.classList.toggle("active");
          });
    }


    // WhatsApp booking function (will be unused but is harmless)
    window.sendToWhatsApp = function(event) {
      event.preventDefault();

      const name = document.getElementById("bookName").value.trim();
      const phone = document.getElementById("bookPhone").value.trim();
      const service = document.getElementById("bookService").value;
      const date = document.getElementById("bookDate").value;
      const notes = document.getElementById("bookNotes").value.trim();

      if (!name || !phone || !service || !date) {
        alert("Please fill in all required fields.");
        return;
      }

      const message = `ｧｹ *New Booking Request*%0A
側 *Name:* ${encodeURIComponent(name)}%0A
到 *Phone:* ${encodeURIComponent(phone)}%0A
ｧｼ *Service:* ${encodeURIComponent(service)}%0A
套 *Date:* ${encodeURIComponent(date)}%0A
桃 *Address & Notes:* ${encodeURIComponent(notes)}`;

      const whatsappNumber = "971568260687"; // Your WhatsApp number here
      const url = `https://wa.me/${whatsappNumber}?text=${message}`;

      window.open(url, "_blank");

      // Close booking modal after sending
      document.getElementById("bookingModal").classList.remove("active");
    }

    // Theme switcher
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    if(themeToggle) {
        themeToggle.addEventListener('change', function() {
            if(this.checked) {
                body.classList.add('dark-mode');
            } else {
                body.classList.remove('dark-mode');
            }
        });
    }

    // =============================================
    // === NEW "SHOW MORE/LESS" SCRIPT START ===
    // =============================================

    const lineLimit = 4; // Set your line/item limit here
    const approxLineHeight = 105; // Set the max-height in pixels (from your CSS)

    document.querySelectorAll('.service-card').forEach(card => {
        const contentWrapper = card.querySelector('.card-content');
        if (!contentWrapper) return;

        let needsButton = false;

        // Check for list content (<ul>)
        const list = contentWrapper.querySelector('ul');
        if (list) {
            // We count direct children (top-level packages or items)
            const items = list.querySelectorAll(':scope > li');
            if (items.length > lineLimit) {
                needsButton = true;
            }
        } 
        // Check for text content (<p>)
        else {
            const text = contentWrapper.querySelector('p');
            if (text && text.scrollHeight > approxLineHeight) {
                needsButton = true;
            }
        }

        // If the content is too long, add the button and collapse it
        if (needsButton) {
            // 1. Add 'collapsed' class
            contentWrapper.classList.add('collapsed');

            // 2. Create and add the button
            const button = document.createElement('button');
            button.className = 'toggle-content-btn';
            button.textContent = 'Show More';
            card.appendChild(button); // Add button to the card

            // 3. Add click event to toggle
            button.addEventListener('click', () => {
                if (contentWrapper.classList.contains('collapsed')) {
                    contentWrapper.classList.remove('collapsed');
                    button.textContent = 'Show Less';
                } else {
                    contentWrapper.classList.add('collapsed');
                    button.textContent = 'Show More';
                }
            });
        }
    });

    // =============================================
    // === NEW "SHOW MORE/LESS" SCRIPT END ===
    // =============================================

});