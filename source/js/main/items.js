const addItem = (item, container) => {
  if (!container.contain(item)) container.appendChild(item);

  return container;
};

export { addItem };
