const container = document.querySelector('.container');
const close_panel = document.querySelector('.panel-closer i');
const boxes = Array.from(document.querySelectorAll('.box'));
const panels = Array.from(document.querySelectorAll('.panel'));
let current_panel;



boxes.forEach((box, i) => {
    box.addEventListener('click', () => {
        // CLOSES container
        transition.begin(container, 
            [
                ['opacity', '1', '0'],
                ['transform', 'translateY(0)', 'translateY(20px)']
            ],
            {
                duration: '200ms',
                timingFunction: 'ease-out',
                onTransitionEnd: (container, finished) => { 
                    if(!finished) return; 
                    // SHOWS panels
                    transition.begin(panels[i], 
                        [
                            ['opacity', '0', '1'],
                            ['transform', 'translateY(-20px)', 'translateY(0)']
                        ], 
                        { 
                            duration: '200ms',
                            timingFunction: 'ease-in-out',
                            onBeforeChangeStyle: () => { 
                                panels[i].style.display = 'flex';
                                container.style.display = 'none'; 
                                close_panel.parentElement.style.display = 'block';
                            } 
                        }
                    );
                }
            }
        );
    })


    close_panel.parentElement.addEventListener('click', () => {
        // CLOSES panels
        current_panel = panels[i];
        transition.begin(current_panel,
            [
                ['opacity', '1', '0'],
                ['transform', 'translateY(0)', 'translateY(-20px)']
            ],
            {
                duration: '200ms',
                timingFunction: 'ease-out',
                onTransitionEnd: (current_panel, finished) => {
                    if(!finished) return;
                    // SHOWS container
                    transition.begin(container,
                        [
                            ['opacity', '0', '1'],
                            ['transform', 'translateY(20px)', 'translateY(0)']
                        ],
                        {
                            duration: '200ms',
                            timingFunction: 'ease-in-out',
                            onBeforeChangeStyle: () => { 
                                container.style.display = 'grid';
                                current_panel.style.display = 'none';
                                close_panel.parentElement.style.display = 'none'; 
                            }
                        }
                    )
                }
            }
        );
    })
})