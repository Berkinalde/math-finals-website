document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('#course-buttons button');
  const imagesContainer = document.getElementById('images-container');

  const topics = {
    'analiz': ['2 Katlı integral', '3 katlı integral', 'Eğrisel integral'],
    'lineer-cebir': ['Karakteristik polinom', 'determinant'],
    'math2': ['Area', 'convergence or divergence'],
    'diff-equations': ['characteristic eq', 'coefficient method']
  };

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.style.border = 'none');
      btn.style.border = '2px solid red';
      const course = btn.getAttribute('data-course');
      imagesContainer.innerHTML = '';
      const subButtons = document.createElement('div');
      subButtons.style.marginBottom = '20px';
      const notesButton = document.createElement('button');
      notesButton.textContent = 'Ders Notları';
      notesButton.style.marginRight = '10px';
      notesButton.style.padding = '10px 20px';
      notesButton.style.fontSize = '1em';
      notesButton.style.border = 'none';
      notesButton.style.borderRadius = '6px';
      notesButton.style.background = '#1976d2';
      notesButton.style.color = '#fff';
      notesButton.style.cursor = 'pointer';
      notesButton.style.transition = 'all 0.3s ease';
      notesButton.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
      notesButton.addEventListener('mouseover', () => {
        notesButton.style.background = '#1565c0';
        notesButton.style.transform = 'translateY(-2px)';
        notesButton.style.boxShadow = '0 6px 8px rgba(0,0,0,0.15)';
      });
      notesButton.addEventListener('mouseout', () => {
        notesButton.style.background = '#1976d2';
        notesButton.style.transform = 'translateY(0)';
        notesButton.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
      });
      notesButton.addEventListener('click', () => {
        fetch(`/api/${course}/notes`)
          .then(res => res.json())
          .then(files => {
            imagesContainer.innerHTML = '';
            if (files.length === 0) {
              imagesContainer.innerHTML = '<p>Bu derse ait ders notu henüz eklenmedi.</p>';
              return;
            }
            files.forEach(file => {
              const fileLink = document.createElement('a');
              fileLink.href = `uploads/${course}/notes/${file}`;
              fileLink.textContent = file;
              fileLink.style.display = 'block';
              fileLink.style.marginBottom = '10px';
              fileLink.style.color = '#1976d2';
              fileLink.style.textDecoration = 'none';
              fileLink.style.fontSize = '1.1em';
              fileLink.target = '_blank';
              imagesContainer.appendChild(fileLink);
            });
          })
          .catch(() => {
            imagesContainer.innerHTML = '<p>Ders notları yüklenirken hata oluştu.</p>';
          });
      });
      const questionsButton = document.createElement('button');
      questionsButton.textContent = 'Soru Çeşitleri';
      questionsButton.style.padding = '10px 20px';
      questionsButton.style.fontSize = '1em';
      questionsButton.style.border = 'none';
      questionsButton.style.borderRadius = '6px';
      questionsButton.style.background = '#388e3c';
      questionsButton.style.color = '#fff';
      questionsButton.style.cursor = 'pointer';
      questionsButton.style.transition = 'all 0.3s ease';
      questionsButton.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
      questionsButton.addEventListener('mouseover', () => {
        questionsButton.style.background = '#2e7d32';
        questionsButton.style.transform = 'translateY(-2px)';
        questionsButton.style.boxShadow = '0 6px 8px rgba(0,0,0,0.15)';
      });
      questionsButton.addEventListener('mouseout', () => {
        questionsButton.style.background = '#388e3c';
        questionsButton.style.transform = 'translateY(0)';
        questionsButton.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
      });
      questionsButton.addEventListener('click', () => {
        const activeButton = document.createElement('div');
        activeButton.textContent = 'Soru Çeşitleri';
        activeButton.style.padding = '10px 20px';
        activeButton.style.fontSize = '1.2em';
        activeButton.style.background = '#388e3c';
        activeButton.style.color = '#fff';
        activeButton.style.borderRadius = '6px';
        activeButton.style.marginBottom = '20px';
        activeButton.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        imagesContainer.innerHTML = '';
        imagesContainer.appendChild(activeButton);
        const topicsList = document.createElement('div');
        topicsList.style.marginBottom = '20px';

        // Add "TÜM SORULAR" button
        const allQuestionsButton = document.createElement('button');
        allQuestionsButton.textContent = 'TÜM SORULAR';
        allQuestionsButton.style.padding = '10px 20px';
        allQuestionsButton.style.fontSize = '1em';
        allQuestionsButton.style.border = 'none';
        allQuestionsButton.style.borderRadius = '6px';
        allQuestionsButton.style.background = '#d32f2f';
        allQuestionsButton.style.color = '#fff';
        allQuestionsButton.style.cursor = 'pointer';
        allQuestionsButton.style.transition = 'all 0.3s ease';
        allQuestionsButton.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        allQuestionsButton.style.marginRight = '10px';
        allQuestionsButton.style.marginBottom = '10px';
        allQuestionsButton.addEventListener('mouseover', () => {
          allQuestionsButton.style.background = '#c62828';
          allQuestionsButton.style.transform = 'translateY(-2px)';
          allQuestionsButton.style.boxShadow = '0 6px 8px rgba(0,0,0,0.15)';
        });
        allQuestionsButton.addEventListener('mouseout', () => {
          allQuestionsButton.style.background = '#d32f2f';
          allQuestionsButton.style.transform = 'translateY(0)';
          allQuestionsButton.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        });
        allQuestionsButton.addEventListener('click', () => {
          fetch(`/api/${course}/all-questions`)
            .then(res => res.json())
            .then(images => {
              imagesContainer.innerHTML = '';
              imagesContainer.appendChild(activeButton);
              imagesContainer.appendChild(topicsList);
              if (images.length === 0) {
                imagesContainer.innerHTML += '<p>Bu derse ait soru çözümü henüz eklenmedi.</p>';
                return;
              }
              images.forEach((img, index) => {
                const imgWrapper = document.createElement('div');
                imgWrapper.style.marginBottom = '20px';
                const title = document.createElement('h3');
                title.textContent = `Soru ${index + 1}`;
                title.style.marginBottom = '8px';
                const imgElem = document.createElement('img');
                imgElem.src = `uploads/${course}/all-questions/${img}`;
                imgElem.alt = `Soru ${index + 1}`;
                imgElem.style.cursor = 'pointer';
                imgElem.addEventListener('click', () => {
                  showLightbox(images, index);
                });
                imgWrapper.appendChild(title);
                imgWrapper.appendChild(imgElem);
                imagesContainer.appendChild(imgWrapper);
              });
            })
            .catch(() => {
              imagesContainer.innerHTML += '<p>Görseller yüklenirken hata oluştu.</p>';
            });
        });
        topicsList.appendChild(allQuestionsButton);

        topics[course].forEach(topic => {
          const topicButton = document.createElement('button');
          topicButton.textContent = topic;
          topicButton.style.padding = '10px 20px';
          topicButton.style.fontSize = '1em';
          topicButton.style.border = 'none';
          topicButton.style.borderRadius = '6px';
          topicButton.style.background = '#f57c00';
          topicButton.style.color = '#fff';
          topicButton.style.cursor = 'pointer';
          topicButton.style.transition = 'all 0.3s ease';
          topicButton.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
          topicButton.style.marginRight = '10px';
          topicButton.addEventListener('mouseover', () => {
            topicButton.style.background = '#ef6c00';
            topicButton.style.transform = 'translateY(-2px)';
            topicButton.style.boxShadow = '0 6px 8px rgba(0,0,0,0.15)';
          });
          topicButton.addEventListener('mouseout', () => {
            topicButton.style.background = '#f57c00';
            topicButton.style.transform = 'translateY(0)';
            topicButton.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
          });
          topicButton.addEventListener('click', () => {
            fetch(`/api/${course}/${topic}`)
              .then(res => res.json())
              .then(images => {
                imagesContainer.innerHTML = '';
                imagesContainer.appendChild(activeButton);
                imagesContainer.appendChild(topicsList);
                if (images.length === 0) {
                  imagesContainer.innerHTML += '<p>Bu konuya ait soru çözümü henüz eklenmedi.</p>';
                  return;
                }
                images.forEach((img, index) => {
                  const imgWrapper = document.createElement('div');
                  imgWrapper.style.marginBottom = '20px';
                  const title = document.createElement('h3');
                  title.textContent = `Soru ${index + 1}`;
                  title.style.marginBottom = '8px';
                  const imgElem = document.createElement('img');
                  imgElem.src = `uploads/${course}/${topic}/${img}`;
                  imgElem.alt = `Soru ${index + 1}`;
                  imgElem.style.cursor = 'pointer';
                  imgElem.addEventListener('click', () => {
                    showLightbox(images, index);
                  });
                  imgWrapper.appendChild(title);
                  imgWrapper.appendChild(imgElem);
                  imagesContainer.appendChild(imgWrapper);
                });
              })
              .catch(() => {
                imagesContainer.innerHTML += '<p>Görseller yüklenirken hata oluştu.</p>';
              });
          });
          topicsList.appendChild(topicButton);
        });
        imagesContainer.appendChild(topicsList);
      });
      subButtons.appendChild(notesButton);
      subButtons.appendChild(questionsButton);
      imagesContainer.appendChild(subButtons);
    });
  });

  function showLightbox(images, startIndex) {
    let currentIndex = startIndex;
    const lightbox = document.createElement('div');
    lightbox.style.position = 'fixed';
    lightbox.style.top = '0';
    lightbox.style.left = '0';
    lightbox.style.width = '100%';
    lightbox.style.height = '100%';
    lightbox.style.backgroundColor = 'rgba(0,0,0,0.8)';
    lightbox.style.display = 'flex';
    lightbox.style.justifyContent = 'center';
    lightbox.style.alignItems = 'center';
    lightbox.style.zIndex = '1000';

    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '20px';
    closeButton.style.right = '20px';
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.color = '#fff';
    closeButton.style.fontSize = '24px';
    closeButton.style.cursor = 'pointer';

    const fullImg = document.createElement('img');
    fullImg.style.maxWidth = '90%';
    fullImg.style.maxHeight = '90%';

    function updateImage() {
      fullImg.src = `uploads/${getCurrentCourse()}/${getCurrentTopic() ? getCurrentTopic() + '/' : ''}${images[currentIndex]}`;
    }

    function navigate(direction) {
      currentIndex = (currentIndex + direction + images.length) % images.length;
      updateImage();
    }

    // Keyboard Navigation
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        navigate(-1);
      } else if (e.key === 'ArrowRight') {
        navigate(1);
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    // Swipe Navigation
    let touchstartX = 0;
    let touchendX = 0;
    const swipeThreshold = 50; // Minimum distance for a swipe

    lightbox.addEventListener('touchstart', e => {
      touchstartX = e.changedTouches[0].screenX;
    });

    lightbox.addEventListener('touchend', e => {
      touchendX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    function handleSwipe() {
      if (touchendX < touchstartX - swipeThreshold) {
        // Swiped left
        navigate(1);
      } else if (touchendX > touchstartX + swipeThreshold) {
        // Swiped right
        navigate(-1);
      }
    }

    closeButton.addEventListener('click', () => {
      document.body.removeChild(lightbox);
      document.removeEventListener('keydown', handleKeyDown);
    });

    lightbox.appendChild(closeButton);
    lightbox.appendChild(fullImg);
    document.body.appendChild(lightbox);
    updateImage();

    // Helper to get current course and topic for image path
    function getCurrentCourse() {
      const activeBtn = document.querySelector('#course-buttons button[style*="border: 2px solid red"]');
      return activeBtn ? activeBtn.getAttribute('data-course') : '';
    }

    function getCurrentTopic() {
      const activeTopicBtn = document.querySelector('#images-container button[style*="background: rgb(245, 124, 0)"]');
      if (activeTopicBtn && activeTopicBtn.textContent === 'TÜM SORULAR') {
        return 'all-questions';
      } else if (activeTopicBtn) {
        return activeTopicBtn.textContent; // This needs to be the actual folder name, not just text
      }
      return '';
    }
  }
}); 