console.log('hello');

document.addEventListener('DOMContentLoaded', function () {
  // DOM elements
  const notificationButton = document.querySelector('.admin_notification-button');
  const notificationList = document.querySelector('.admin_notification-list');
  const menuButton = document.querySelector('.admin_profile-button');
  const adminMenu = document.querySelector('.admin_profile-menu');
  const menuList = adminMenu.querySelectorAll('.navigation-link');
  const dismissButton = document.querySelector('.cta-dismiss-button');
  const toggleStepsButton = document.querySelector('.collapse-card-button');
  const accordionButtons = document.querySelectorAll('.accordion');
  const checkboxes = document.querySelectorAll('.checkbox');

  // handle mouse event listeners
  notificationButton.addEventListener('click', notificationIsExpanded);
  menuButton.addEventListener('click', adminMenuIsExpanded);
  dismissButton.addEventListener('click', dismissPlanCard);
  toggleStepsButton.addEventListener('click', handleArrowToggleEvent);
  accordionButtons.forEach((accordionButton) => {
    accordionButton.addEventListener('click', handleAccordionAction);
  });
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', handleAccordionAction);
  });

  // handle keyboard events listeners
  adminMenu.addEventListener('keydown', handleEscapeKeyPress);
  menuList.forEach((menuItem) => {
    menuItem.addEventListener('keydown', handleMenuListNavigation);
  });
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('keydown', handleAccordionAction);
  });

  // event functions
  function notificationIsExpanded() {
    notificationList.classList.toggle('open');
    adminMenu.classList.remove('expanded');
    handleAriaAttributes(notificationButton);
  }

  function adminMenuIsExpanded() {
    adminMenu.classList.toggle('expanded');
    notificationList.classList.remove('open');
    handleAriaAttributes(menuButton);
    focusFirstItem();
  }

  function focusFirstItem() {
    const menuFirstLink = adminMenu.querySelector('.navigation-link');
    if (menuFirstLink) {
      menuFirstLink.focus();
    }
  }
//  handle aria-expanded attributes of elements that have pop-ups
  function handleAriaAttributes(element) {
    let isExpanded = element.getAttribute('aria-expanded') === 'true';
    element.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
    console.log(element.getAttribute('aria-expanded'));
  }
// handles the keyboard navigation of menu items

  function handleEscapeKeyPress(e) {
    const key = e.key || e.keyCode;
    // Check if the pressed key is the Escape key
    if (key === 'Escape' || key === 'Esc' || key === 27) {
      adminMenu.classList.remove('expanded');
      menuButton.focus();
    }
  }

  function handleMenuListNavigation(e) {
    if (
      e.code === 'ArrowUp' ||
      e.code === 'ArrowDown' ||
      e.code === 'ArrowLeft' ||
      e.code === 'ArrowRight'
    ) {
      handleArrowNavigation(e, menuList);
    }
  }
  function handleArrowNavigation(e, itemList) {
    const currentIndex = Array.from(itemList).indexOf(e.target);
    let newIndex;
    if (e.code === 'ArrowUp' || e.code === 'ArrowLeft') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : itemList.length - 1;
    } else if (e.code === 'ArrowDown' || e.code === 'ArrowRight') {
      newIndex = currentIndex < itemList.length - 1 ? currentIndex + 1 : 0;
    }
    itemList[newIndex].focus();
  }
// plan selection cta functionalities
  function dismissPlanCard() {
    const planSelectionCard = document.querySelector('.plan-selection-card');
    planSelectionCard.classList.add('dismiss');
    handlePlanCardAttribute(planSelectionCard);
  }

  function handlePlanCardAttribute(planSelectionCard) {
    const isHidden = planSelectionCard.getAttribute('aria-hidden') === 'true';
    planSelectionCard.setAttribute('aria-hidden', isHidden ? 'false' : 'true');
    console.log(planSelectionCard.getAttribute('aria-hidden'));
  }

//setup guide arrow functionalities
  function handleArrowToggleEvent() {
    toggleArrowOnClick();
    toggleSetUpGuideAttributes();
    expandStepsList();
    expandStepListFirstChild();
  }
  function toggleArrowOnClick() {
    const toggleIcon = document.querySelector('.toggle-card-icon');
    toggleIcon.classList.toggle('expanded');
  }

  function toggleSetUpGuideAttributes() {
    const isExpanded = toggleStepsButton.getAttribute('aria-expanded') === 'true';
    toggleStepsButton.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
    console.log(toggleStepsButton.getAttribute('aria-expanded'));

    const collapsibleSetupGuide = document.getElementById('setup-guide-collapsible');
    const isHidden = collapsibleSetupGuide.getAttribute('aria-hidden') === 'true';
    collapsibleSetupGuide.setAttribute('aria-hidden', isHidden ? 'false' : 'true');
    console.log(collapsibleSetupGuide.getAttribute('aria-hidden'));
  }

  function expandStepsList() {
    let stepsList = document.querySelectorAll('.steps-container');
    stepsList.forEach((step) => {
      step.classList.toggle('expanded');
    });
  }

  function expandStepListFirstChild() {
    let stepOneCard = document.querySelector('.accordion:nth-child(1)');
    stepOneCard.classList.add('expanded');
    stepOneCard.nextElementSibling.classList.add('expanded');
    stepOneCard.parentNode.parentNode.parentNode.classList.add('background');
    stepOneCard.parentNode.parentNode.nextElementSibling.classList.add('expanded');
  }
// control accordion based on whether the accordion button is clicked or the checkbox is checked
function handleAccordionAction(e) {
    const targetNode = e.target;
    if (targetNode.classList.contains('checkbox')) {
      handleAccordionOnCheck(e);
      updateProgressBar();
      console.log('its checked');
    } else if (targetNode.classList.contains('accordion')) {
      handleAccordionToggle(e);
      console.log('its accord');
    }
  }
// accordion functionalities
  function handleAccordionToggle(e) {
    let accordionId = e.target.id;
    const panel = e.target.nextElementSibling;
    handleAccordionAttributes(e.target, panel);
    closeOtherStepCards(accordionId);
    expandTargetStepCard(e.target, panel);
  }

  function handleAccordionAttributes(accordion, panel) {
    let isExpanded = accordion.getAttribute('aria-expanded') === 'true';
    accordion.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
    console.log(accordion.getAttribute('aria-expanded'));

    const isHidden = panel.getAttribute('aria-hidden') === 'true';
    panel.setAttribute('aria-hidden', isHidden ? 'false' : 'true');
    console.log(panel.getAttribute('aria-hidden'));
  }
 
  function expandTargetStepCard(accordion, panel) {
    accordion.classList.add('expanded');
    panel.classList.add('expanded');
    accordion.parentNode.parentNode.parentNode.classList.add('background');
    accordion.parentNode.parentNode.nextElementSibling.classList.add('expanded');
  }

  function closeOtherStepCards(accordionId) {
    let targetAccordion = document.getElementById(accordionId);
    allAccordions = document.querySelectorAll('.accordion');
    allAccordions.forEach((accordion) => {
      if (accordion !== targetAccordion) {
        accordion.classList.remove('expanded');
        accordion.nextElementSibling.classList.remove('expanded');
        accordion.parentNode.parentNode.parentNode.classList.remove('background');
        accordion.parentNode.parentNode.nextElementSibling.classList.remove('expanded');
      }
    });
  }

// checkbox functionalites
  function handleAccordionOnCheck(e) {
    const targetCheckBox = e.target;
    const index = Array.from(checkboxes).indexOf(targetCheckBox);
    let isChecked = e.target.checked;
    let nextCheckBox =
      e.target.parentNode.parentNode.nextElementSibling?.children[0]?.children[1];

    if (index < checkboxes.length && isChecked === true) {
      handleCheckedCheckbox(targetCheckBox, nextCheckBox);
    } else {
      handleUncheckedCheckbox(targetCheckBox, nextCheckBox);
    }
  }

  function handleCheckedCheckbox(checkbox, nextCheckBox) {
    checkbox.parentNode.parentNode.classList.remove('background');
    checkbox.nextElementSibling.children[0].classList.remove('expanded');
    checkbox.nextElementSibling.children[1].classList.remove('expanded');
    checkbox.parentNode.nextElementSibling.classList.remove('expanded')

    if (nextCheckBox) {
      nextCheckBox.parentNode.parentNode.classList.add('background');
      nextCheckBox.nextElementSibling.children[0].classList.add('expanded');
      nextCheckBox.nextElementSibling.children[1].classList.add('expanded');
      nextCheckBox.parentNode.nextElementSibling.classList.add('expanded')
    }
    console.log(checkbox.parentNode.nextElementSibling)
  }

  function handleUncheckedCheckbox(checkbox, nextCheckBox) {
    checkbox.parentNode.parentNode.classList.add('background');
    checkbox.nextElementSibling.children[0].classList.add('expanded');
    checkbox.nextElementSibling.children[1].classList.add('expanded');
    checkbox.parentNode.nextElementSibling.classList.add('expanded')

    if (nextCheckBox) {
      nextCheckBox.parentNode.parentNode.classList.remove('background');
      nextCheckBox.nextElementSibling.children[0].classList.remove('expanded');
      nextCheckBox.nextElementSibling.children[1].classList.remove('expanded');
      nextCheckBox.parentNode.nextElementSibling.classList.remove('expanded')
    }
  }

  function updateProgressBar() {
    const progressBar = document.getElementById('progress');
    const completedSteps = document.querySelectorAll('.checkbox:checked').length;
    const progressCounter = document.querySelector('.counter-indicator');
    progressBar.value = completedSteps;
    progressCounter.textContent = `${progressBar.value} / 5`;
  }
});
