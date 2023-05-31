import { BsGithub, BsLinkedin, BsFillEnvelopeFill } from 'react-icons/bs';
import './Footer.css';

export default function Footer() {
    return (
        <footer>
            <div>
                <h3>Về website này</h3>
                <ul>
                    <li>Được tạo bởi công nghệ MERN Stack</li>
                    <li>Đóng gói và quản lý bởi Docker</li>
                    <li>Xử lý proxy với Nginx</li>
                    <li><span>Hình ảnh được lấy từ trang <a href="https://levents.asia/" rel="noreferrer" target="_blank">Levents</a></span></li>
                </ul>
            </div>
            <div>
                <h3>Thông tin về bản thân</h3>
                <ul>
                    <li><BsGithub /><a href="https://github.com/yukirelia" rel="noreferrer" target="_blank">Github</a></li>
                    <li><BsLinkedin /><a href="https://www.linkedin.com/in/l%C3%AA-t%E1%BA%A5n-ph%C3%A1t-23b669247/" rel="noreferrer" target="_blank">Linkedin</a></li>
                    <li><BsFillEnvelopeFill /><a href="mailto:ltphat2204@gmail.com" rel="noreferrer" target="_blank">Email</a></li>
                </ul>
            </div>
        </footer>
    );
}