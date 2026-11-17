const form=document.getElementById('sampleForm');
form.noValidate=true;
form.addEventListener('submit',function(e){
 e.preventDefault();const errors=[];
 const val=id=>document.getElementById(id).value.trim();
 if(!val('name'))errors.push('Vui lòng nhập tên');
 if(!/^\+?[0-9]{9,12}$/.test(val('phone')))errors.push('Số điện thoại phải có 9–12 chữ số');
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val('email')))errors.push('Email không hợp lệ');
 if(val('pass').length<6)errors.push('Mật khẩu cần ít nhất 6 ký tự');
 const box=document.getElementById('errors');box.replaceChildren();
 if(errors.length){const ul=document.createElement('ul');errors.forEach(message=>{const li=document.createElement('li');li.textContent=message;ul.appendChild(li);});box.appendChild(ul);}
 else{const p=document.createElement('p');p.textContent='Đăng ký hợp lệ (demo, chưa gửi dữ liệu).';p.style.color='#156845';box.appendChild(p);}
});
