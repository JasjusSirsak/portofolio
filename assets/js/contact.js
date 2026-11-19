(function() {
      const copyBtn = document.getElementById('copy-email-btn');
      const copyLabel = document.getElementById('copy-label');
      const copyIcon = document.getElementById('copy-icon');
      const email = 'b.callista.v@gmail.com';

      if (copyBtn) {
        copyBtn.addEventListener('click', function() {
          if (navigator.clipboard) {
            navigator.clipboard.writeText(email).then(handleSuccess).catch(handleFallback);
          } else {
            handleFallback();
          }
        });
      }

      function handleSuccess() {
        if (copyLabel) copyLabel.textContent = 'Copied to Clipboard!';
        if (copyIcon) copyIcon.textContent = 'check';
        setTimeout(resetCopyBtn, 2800);
      }

      function handleFallback() {
        const tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        try {
          document.execCommand('copy');
          handleSuccess();
        } catch (err) {
          if (copyLabel) copyLabel.textContent = 'b.callista.v@gmail.com';
        }
        document.body.removeChild(tempInput);
      }

      function resetCopyBtn() {
        if (copyLabel) copyLabel.textContent = 'Copy Email';
        if (copyIcon) copyIcon.textContent = 'content_copy';
      }
    })();
